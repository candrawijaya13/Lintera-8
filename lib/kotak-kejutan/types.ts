export type QuestionDifficulty = 'mudah' | 'sedang' | 'sulit';

export type QuestionTopic =
  | 'unsur-unsur-lingkaran'
  | 'kedudukan-titik'
  | 'kedudukan-garis';

export type QuestionType = 'pilihan-ganda' | 'isian-angka';

export interface QuestionOption {
  id: string; // 'A' | 'B' | 'C' | 'D'
  text: string;
}

export interface Question {
  id: string;
  topic: QuestionTopic;
  topicLabel: string;
  difficulty: QuestionDifficulty;
  type: QuestionType;
  isContextual: boolean;
  question: string;
  options?: QuestionOption[]; // for pilihan-ganda
  correctAnswer: string; // 'A', 'B', 'C', 'D' or numeric string like '14'
  explanation: string;
  timeLimit: number; // in seconds: 30, 60, or 90
}

export type RewardEffectType =
  | 'recipient_add'
  | 'recipient_subtract'
  | 'others_add'
  | 'others_subtract'
  | 'no_effect';

export interface Reward {
  id: string;
  name: string;
  description: string;
  effectType: RewardEffectType;
  pointChange: number;
  iconName: string;
  badgeColor: string;
}

export interface Team {
  id: number;
  name: string;
  color: string;
  score: number;
  correctCount: number;
  wrongCount: number;
  timeoutCount: number;
  skippedCount: number;
}

export type BoxStatus = 'closed' | 'opened' | 'skipped';

export interface BoxItem {
  boxNumber: number;
  question: Question;
  status: BoxStatus;
  usedByTeamId?: number;
}

export type AnswerStatus = 'correct' | 'incorrect' | 'timeout' | 'skipped';

export interface HistoryEntry {
  boxNumber: number;
  teamId: number;
  teamName: string;
  questionId: string;
  questionTopic: string;
  difficulty: QuestionDifficulty;
  userAnswer?: string;
  correctAnswer: string;
  status: AnswerStatus;
  actionTaken?: 'keep' | 'pass';
  passedToTeamId?: number;
  passedToTeamName?: string;
  reward?: Reward;
  scoreChangeDescription: string;
  id: number;
}

export interface GameSettings {
  questionCount: 30 | 40;
  teamCount: number; // 2 to 6
  teams: { id: number; name: string; color: string }[];
}
