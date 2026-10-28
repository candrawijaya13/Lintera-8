import { Reward, Team, RewardEffectType } from './types';

export const REWARD_POOL: Reward[] = [
  {
    id: 'rw_add_100',
    name: 'Bintang Kejutan Emas',
    description: 'Menambah +100 poin untuk penerima!',
    effectType: 'recipient_add',
    pointChange: 100,
    iconName: 'Sparkles',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
  },
  {
    id: 'rw_add_50',
    name: 'Poin Keberuntungan',
    description: 'Menambah +50 poin untuk penerima!',
    effectType: 'recipient_add',
    pointChange: 50,
    iconName: 'PlusCircle',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
  },
  {
    id: 'rw_sub_50',
    name: 'Perangkap Kotak Misteri',
    description: 'Mengurangi -50 poin dari penerima!',
    effectType: 'recipient_subtract',
    pointChange: 50,
    iconName: 'AlertTriangle',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
  },
  {
    id: 'rw_others_add_50',
    name: 'Kado Persahabatan',
    description: 'Menambah +50 poin untuk semua kelompok SELAIN penerima!',
    effectType: 'others_add',
    pointChange: 50,
    iconName: 'Gift',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
  },
  {
    id: 'rw_others_sub_25',
    name: 'Petir Pengguncang Lawan',
    description: 'Mengurangi -25 poin dari semua kelompok SELAIN penerima!',
    effectType: 'others_subtract',
    pointChange: 25,
    iconName: 'Zap',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
  },
  {
    id: 'rw_no_effect',
    name: 'Kotak Santai (Zonk)',
    description: 'Kotak santai! Tidak ada perubahan poin untuk siapa pun.',
    effectType: 'no_effect',
    pointChange: 0,
    iconName: 'Smile',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
  },
  {
    id: 'rw_add_75',
    name: 'Bonus Berlian Biru',
    description: 'Menambah +75 poin untuk penerima!',
    effectType: 'recipient_add',
    pointChange: 75,
    iconName: 'Gem',
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300',
  },
  {
    id: 'rw_sub_30',
    name: 'Awan Kelabu',
    description: 'Mengurangi -30 poin dari penerima!',
    effectType: 'recipient_subtract',
    pointChange: 30,
    iconName: 'CloudRain',
    badgeColor: 'bg-orange-100 text-orange-800 border-orange-300',
  },
];

/**
 * Draws a random reward from the active reward pool.
 */
export function drawRandomReward(): Reward {
  const randomIndex = Math.floor(Math.random() * REWARD_POOL.length);
  return REWARD_POOL[randomIndex];
}

/**
 * Applies the reward effects to all teams.
 * Minimum score is clamped at 0.
 * Returns the updated array of teams and a human-readable description of the change.
 */
export function applyRewardToTeams(
  teams: Team[],
  reward: Reward,
  recipientTeamId: number
): { updatedTeams: Team[]; changeDescription: string } {
  const recipient = teams.find((t) => t.id === recipientTeamId);
  const recipientName = recipient ? recipient.name : `Kelompok ${recipientTeamId}`;

  let changeDescription = '';

  const updatedTeams = teams.map((team) => {
    let newScore = team.score;

    switch (reward.effectType) {
      case 'recipient_add':
        if (team.id === recipientTeamId) {
          newScore = Math.max(0, team.score + reward.pointChange);
        }
        break;

      case 'recipient_subtract':
        if (team.id === recipientTeamId) {
          newScore = Math.max(0, team.score - reward.pointChange);
        }
        break;

      case 'others_add':
        if (team.id !== recipientTeamId) {
          newScore = Math.max(0, team.score + reward.pointChange);
        }
        break;

      case 'others_subtract':
        if (team.id !== recipientTeamId) {
          newScore = Math.max(0, team.score - reward.pointChange);
        }
        break;

      case 'no_effect':
      default:
        break;
    }

    return {
      ...team,
      score: newScore,
    };
  });

  switch (reward.effectType) {
    case 'recipient_add':
      changeDescription = `${recipientName} mendapatkan +${reward.pointChange} poin!`;
      break;
    case 'recipient_subtract':
      changeDescription = `${recipientName} kehilangan ${reward.pointChange} poin! (Skor minimum 0)`;
      break;
    case 'others_add':
      changeDescription = `Semua kelompok kecuali ${recipientName} mendapatkan +${reward.pointChange} poin!`;
      break;
    case 'others_subtract':
      changeDescription = `Semua kelompok kecuali ${recipientName} kehilangan ${reward.pointChange} poin! (Skor minimum 0)`;
      break;
    case 'no_effect':
    default:
      changeDescription = `Kotak santai! Skor semua kelompok tetap aman.`;
      break;
  }

  return { updatedTeams, changeDescription };
}
