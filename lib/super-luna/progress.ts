export interface LevelResult {
  levelId: number;
  completed: boolean;
  score: number;
  maxScore: number;
  coinsEarned: number;
  stars: number; // 0 to 3
  bestTimeSeconds?: number;
}

export interface PlayerProgress {
  unlockedLevels: number[]; // e.g. [1] or [1, 2] or [1, 2, 3]
  totalCoins: number;
  levelResults: Record<number, LevelResult>;
  allCompleted: boolean;
}

const STORAGE_KEY = 'lintera_super_luna_progress_v1';

export const DEFAULT_PROGRESS: PlayerProgress = {
  unlockedLevels: [1],
  totalCoins: 0,
  levelResults: {},
  allCompleted: false,
};

export function getPlayerProgress(): PlayerProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    return {
      unlockedLevels: parsed.unlockedLevels || [1],
      totalCoins: parsed.totalCoins || 0,
      levelResults: parsed.levelResults || {},
      allCompleted: parsed.allCompleted || false,
    };
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function saveLevelResult(
  levelId: number,
  score: number,
  maxScore: number,
  coins: number
): PlayerProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const current = getPlayerProgress();
    const percent = maxScore > 0 ? (score / maxScore) * 100 : 0;
    
    let stars = 1;
    if (percent >= 85) stars = 3;
    else if (percent >= 60) stars = 2;

    const existing = current.levelResults[levelId];
    const bestScore = existing ? Math.max(existing.score, score) : score;
    const bestStars = existing ? Math.max(existing.stars, stars) : stars;

    const updatedResults = {
      ...current.levelResults,
      [levelId]: {
        levelId,
        completed: true,
        score: bestScore,
        maxScore,
        coinsEarned: (existing?.coinsEarned || 0) + coins,
        stars: bestStars,
      },
    };

    // Unlock next level if score >= 60%
    const unlocked = new Set(current.unlockedLevels);
    unlocked.add(1);
    if (percent >= 60) {
      if (levelId === 1) unlocked.add(2);
      if (levelId === 2) unlocked.add(3);
    }

    const allDone = [1, 2, 3].every(
      (lvl) => updatedResults[lvl]?.completed && updatedResults[lvl]?.stars > 0
    );

    const newProgress: PlayerProgress = {
      unlockedLevels: Array.from(unlocked).sort(),
      totalCoins: current.totalCoins + coins,
      levelResults: updatedResults,
      allCompleted: allDone,
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
    return newProgress;
  } catch {
    return DEFAULT_PROGRESS;
  }
}

export function resetPlayerProgress(): PlayerProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    localStorage.removeItem(STORAGE_KEY);
    return DEFAULT_PROGRESS;
  } catch {
    return DEFAULT_PROGRESS;
  }
}
