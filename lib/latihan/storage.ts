import { LatihanSessionResult, LatihanTopicId } from './types';

const STUDENT_NAME_KEY = 'lintera_student_name';
const LATIHAN_RESULTS_KEY = 'lintera_latihan_results';
const REFLEKSI_HISTORY_KEY = 'lintera_refleksi_history';

export interface RefleksiData {
  id: string;
  studentName: string;
  date: string;
  formattedDate: string;
  understood: string;
  difficult: string;
  nextStep: string;
  comprehensionLevel: string; // 'Masih perlu bimbingan' | 'Mulai memahami' | 'Sudah memahami' | 'Sangat memahami'
}

export function getStoredStudentName(): string {
  if (typeof window === 'undefined') return 'Siswa LINTERA';
  try {
    const name = localStorage.getItem(STUDENT_NAME_KEY);
    return name && name.trim() ? name.trim() : 'Siswa LINTERA';
  } catch {
    return 'Siswa LINTERA';
  }
}

export function setStoredStudentName(name: string): void {
  if (typeof window === 'undefined') return;
  try {
    if (name && name.trim()) {
      localStorage.setItem(STUDENT_NAME_KEY, name.trim());
    }
  } catch {
    // Ignore storage errors
  }
}

export function getStoredLatihanResults(): Record<LatihanTopicId, LatihanSessionResult | null> {
  const defaultResults: Record<LatihanTopicId, LatihanSessionResult | null> = {
    'unsur-lingkaran': null,
    'kedudukan-titik': null,
    'kedudukan-garis': null,
  };

  if (typeof window === 'undefined') return defaultResults;

  try {
    const raw = localStorage.getItem(LATIHAN_RESULTS_KEY);
    if (!raw) return defaultResults;
    const parsed = JSON.parse(raw);
    return {
      'unsur-lingkaran': parsed['unsur-lingkaran'] || null,
      'kedudukan-titik': parsed['kedudukan-titik'] || null,
      'kedudukan-garis': parsed['kedudukan-garis'] || null,
    };
  } catch {
    return defaultResults;
  }
}

export function saveLatihanResult(result: LatihanSessionResult): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getStoredLatihanResults();
    current[result.topicId] = result;
    localStorage.setItem(LATIHAN_RESULTS_KEY, JSON.stringify(current));
  } catch {
    // Ignore storage errors
  }
}

export function getStoredRefleksiHistory(): RefleksiData[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(REFLEKSI_HISTORY_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveRefleksiData(data: Omit<RefleksiData, 'id' | 'date' | 'formattedDate'>): RefleksiData {
  const now = new Date();
  const formattedDate = new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(now);

  const entry: RefleksiData = {
    ...data,
    id: `refleksi-${Date.now()}`,
    date: now.toISOString(),
    formattedDate,
  };

  if (typeof window !== 'undefined') {
    try {
      const history = getStoredRefleksiHistory();
      const updated = [entry, ...history];
      localStorage.setItem(REFLEKSI_HISTORY_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }
  }

  return entry;
}
