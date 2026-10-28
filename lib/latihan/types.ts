export type LatihanTopicId = 'unsur-lingkaran' | 'kedudukan-titik' | 'kedudukan-garis';

export type LatihanDifficulty = 'mudah' | 'sedang' | 'sulit' | 'tantangan';

export type LatihanQuestionType = 'pilihan-ganda' | 'isian-angka';

export interface LatihanOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
}

export interface LatihanQuestion {
  id: string; // e.g. LAT-UNS-01, LAT-TIT-01, LAT-GAR-01
  topic: LatihanTopicId;
  topicTitle?: string;
  topicLabel?: string;
  number: number; // 1 to 20
  difficulty: LatihanDifficulty;
  difficultyLabel: string;
  type: LatihanQuestionType;
  question: string;
  options?: LatihanOption[];
  correctAnswer: string;
  explanation: string;
  numericTolerance?: number;
}

export interface LatihanAnswerRecord {
  questionId: string;
  questionNumber: number;
  questionText: string;
  difficulty: LatihanDifficulty;
  type: LatihanQuestionType;
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  explanation: string;
}

export interface LatihanSessionResult {
  topicId: LatihanTopicId;
  topicTitle: string;
  studentName: string;
  completedAt: string; // ISO string
  formattedDate: string; // e.g. 28 Oktober 2026
  totalQuestions: number; // 20
  correctCount: number;
  wrongCount: number;
  score: number; // 0 - 100
  percentage: number;
  answers: LatihanAnswerRecord[];
}

export interface TopicInfo {
  id: LatihanTopicId;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  iconBg: string;
  borderColor: string;
  accentColor: string;
  totalQuestions: number;
}

export const LATIHAN_TOPICS: TopicInfo[] = [
  {
    id: 'unsur-lingkaran',
    slug: 'unsur-lingkaran',
    title: 'Unsur-Unsur Lingkaran',
    subtitle: 'Konsep Geometri Dasar & Hubungan Antarunsur',
    description: 'Pusat, jari-jari, diameter, busur, tali busur, juring, tembereng, dan apotema.',
    iconBg: 'bg-blue-100 text-blue-700',
    borderColor: 'border-blue-200',
    accentColor: '#2563EB',
    totalQuestions: 20,
  },
  {
    id: 'kedudukan-titik',
    slug: 'kedudukan-titik',
    title: 'Kedudukan Titik terhadap Lingkaran',
    subtitle: 'Analisis Posisi Titik & Persamaan Lingkaran',
    description: 'Menentukan posisi titik di dalam, pada, atau di luar lingkaran berpusat di (0,0) maupun (a,b).',
    iconBg: 'bg-emerald-100 text-emerald-700',
    borderColor: 'border-emerald-200',
    accentColor: '#10B981',
    totalQuestions: 20,
  },
  {
    id: 'kedudukan-garis',
    slug: 'kedudukan-garis',
    title: 'Kedudukan Garis terhadap Lingkaran',
    subtitle: 'Sistem Persamaan Sekutu & Diskriminan',
    description: 'Menyelidiki garis memotong, menyinggung, atau di luar lingkaran dengan diskriminan dan jarak pusat.',
    iconBg: 'bg-purple-100 text-purple-700',
    borderColor: 'border-purple-200',
    accentColor: '#8B5CF6',
    totalQuestions: 20,
  },
];
