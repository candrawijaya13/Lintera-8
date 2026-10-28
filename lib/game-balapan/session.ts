import {
  RacingQuestion,
  RacingTeam,
  TEAM_PRESETS,
  FINISH_LINE_STEPS,
  TeamAnswerHistory,
} from './types';
import {
  UNSUR_QUESTIONS,
  TITIK_QUESTIONS,
  GARIS_QUESTIONS,
} from './questions-bank';

/**
 * Fisher-Yates array shuffle (immutable)
 */
export function shuffleArray<T>(items: T[]): T[] {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Allocates exactly 30 unique questions per team with:
 * - 7 questions from Unsur-unsur Lingkaran
 * - 14 questions from Kedudukan Titik terhadap Lingkaran
 * - 9 questions from Kedudukan Garis terhadap Lingkaran
 * 
 * Ensures NO duplicate question IDs between different teams in the same session.
 */
export function initializeRacingTeams(
  teamCount: number,
  customTeamNames: string[]
): RacingTeam[] {
  // Validate team count (2 to 4)
  const count = Math.max(2, Math.min(4, teamCount));

  // Shuffle pools once per session setup
  const shuffledUnsur = shuffleArray(UNSUR_QUESTIONS);
  const shuffledTitik = shuffleArray(TITIK_QUESTIONS);
  const shuffledGaris = shuffleArray(GARIS_QUESTIONS);

  const teams: RacingTeam[] = [];

  for (let t = 0; t < count; t++) {
    const preset = TEAM_PRESETS[t % TEAM_PRESETS.length];
    const name = customTeamNames[t]?.trim() || preset.defaultName;

    // Slice non-overlapping blocks for each team
    // 7 Unsur per team
    const teamUnsur = shuffledUnsur.slice(t * 7, (t + 1) * 7);
    // 14 Titik per team
    const teamTitik = shuffledTitik.slice(t * 14, (t + 1) * 14);
    // 9 Garis per team
    const teamGaris = shuffledGaris.slice(t * 9, (t + 1) * 9);

    // Combine and shuffle order within the team's session
    const teamQuestions = shuffleArray([...teamUnsur, ...teamTitik, ...teamGaris]);

    teams.push({
      id: preset.id,
      name,
      colorName: preset.colorName,
      colorHex: preset.colorHex,
      badgeBg: preset.badgeBg,
      gokartImage: preset.gokartImage,
      currentStep: 0,
      currentQuestionIndex: 0,
      questions: teamQuestions,
      correctCount: 0,
      wrongCount: 0,
      totalStepsForward: 0,
      totalStepsBackward: 0,
      history: [],
    });
  }

  return teams;
}

/**
 * Validates a user's answer against the question's correctAnswer.
 * Supports multiple choice (A, B, C, D) and numeric format.
 */
export function verifyAnswer(
  question: RacingQuestion,
  givenAnswer: string
): boolean {
  if (!givenAnswer || !givenAnswer.trim()) return false;

  const cleanGiven = givenAnswer.trim();
  const cleanTarget = question.correctAnswer.trim();

  if (question.type === 'pilihan-ganda') {
    return cleanGiven.toUpperCase() === cleanTarget.toUpperCase();
  }

  // Numeric verification with decimal/comma normalization
  const normalizedGiven = cleanGiven.replace(',', '.');
  const normalizedTarget = cleanTarget.replace(',', '.');

  const numGiven = parseFloat(normalizedGiven);
  const numTarget = parseFloat(normalizedTarget);

  if (!isNaN(numGiven) && !isNaN(numTarget)) {
    const tolerance = question.numericTolerance ?? 0.001;
    return Math.abs(numGiven - numTarget) <= tolerance;
  }

  return cleanGiven.toLowerCase() === cleanTarget.toLowerCase();
}

/**
 * Random step roll for a correct answer:
 * 1, 2, or 3 steps with equal probability (1/3 each).
 */
export function rollCorrectStep(): 1 | 2 | 3 {
  const rand = Math.random();
  if (rand < 1 / 3) return 1;
  if (rand < 2 / 3) return 2;
  return 3;
}
