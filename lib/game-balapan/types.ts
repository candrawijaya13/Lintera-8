export type RacingTopic = 'unsur-lingkaran' | 'kedudukan-titik' | 'kedudukan-garis';

export type QuestionType = 'pilihan-ganda' | 'isian-angka';

export type QuestionDifficulty = 'mudah' | 'sedang' | 'sulit';

export interface QuestionOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface RacingQuestion {
  id: string; // e.g. UL001, KT001, KG001
  topic: RacingTopic;
  topicLabel: string;
  difficulty: QuestionDifficulty;
  type: QuestionType;
  question: string;
  options?: QuestionOption[];
  correctAnswer: string;
  explanation: string;
  numericTolerance?: number;
}

export interface RacingTeam {
  id: number;
  name: string;
  colorName: string;
  colorHex: string;
  badgeBg: string;
  gokartImage: string;
  currentStep: number; // 0 to FINISH_LINE_STEPS
  currentQuestionIndex: number; // 0 to 29
  questions: RacingQuestion[];
  correctCount: number;
  wrongCount: number;
  totalStepsForward: number;
  totalStepsBackward: number;
  history: TeamAnswerHistory[];
}

export interface TeamAnswerHistory {
  questionNumber: number;
  questionId: string;
  topicLabel: string;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  stepChange: number; // +1, +2, +3 or -1
  timestamp: number;
}

export const FINISH_LINE_STEPS = 20;

export const TEAM_PRESETS = [
  {
    id: 1,
    defaultName: 'Kelompok 1 (Oranye)',
    colorName: 'Oranye',
    colorHex: '#EA580C',
    badgeBg: 'bg-orange-500 text-white',
    gokartImage: '/assets/game-balapan/luna-gokart-orange.png',
  },
  {
    id: 2,
    defaultName: 'Kelompok 2 (Pink)',
    colorName: 'Pink',
    colorHex: '#EC4899',
    badgeBg: 'bg-pink-500 text-white',
    gokartImage: '/assets/game-balapan/luna-gokart-pink.png',
  },
  {
    id: 3,
    defaultName: 'Kelompok 3 (Hijau)',
    colorName: 'Hijau',
    colorHex: '#10B981',
    badgeBg: 'bg-emerald-500 text-white',
    gokartImage: '/assets/game-balapan/luna-gokart-green.png',
  },
  {
    id: 4,
    defaultName: 'Kelompok 4 (Putih)',
    colorName: 'Putih',
    colorHex: '#F59E0B',
    badgeBg: 'bg-amber-500 text-slate-950',
    gokartImage: '/assets/game-balapan/luna-gokart-white.png',
  },
];
