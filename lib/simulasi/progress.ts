'use client';

export interface SimulasiProgress {
  unlockedStages: number[]; // [1] initially, unlocks 2, 3, 4
  completedStages: number[]; // stages completed
  stageScores: Record<number, number>; // score or challenges solved per stage
}

const STORAGE_KEY = 'lintera_simulasi_progress_v1';

export const DEFAULT_SIMULASI_PROGRESS: SimulasiProgress = {
  unlockedStages: [1],
  completedStages: [],
  stageScores: {},
};

export function getSimulasiProgress(): SimulasiProgress {
  if (typeof window === 'undefined') return DEFAULT_SIMULASI_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SIMULASI_PROGRESS;
    const parsed = JSON.parse(raw);
    return {
      unlockedStages: parsed.unlockedStages || [1],
      completedStages: parsed.completedStages || [],
      stageScores: parsed.stageScores || {},
    };
  } catch {
    return DEFAULT_SIMULASI_PROGRESS;
  }
}

export function completeSimulasiStage(stageId: number, score: number = 100): SimulasiProgress {
  if (typeof window === 'undefined') return DEFAULT_SIMULASI_PROGRESS;
  try {
    const current = getSimulasiProgress();
    const completedSet = new Set(current.completedStages);
    completedSet.add(stageId);

    const unlockedSet = new Set(current.unlockedStages);
    unlockedSet.add(1);
    if (stageId < 4) {
      unlockedSet.add(stageId + 1); // Unlock next stage
    }

    const updated: SimulasiProgress = {
      unlockedStages: Array.from(unlockedSet).sort(),
      completedStages: Array.from(completedSet).sort(),
      stageScores: {
        ...current.stageScores,
        [stageId]: Math.max(current.stageScores[stageId] || 0, score),
      },
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return DEFAULT_SIMULASI_PROGRESS;
  }
}

export function resetSimulasiProgress(): SimulasiProgress {
  if (typeof window === 'undefined') return DEFAULT_SIMULASI_PROGRESS;
  try {
    localStorage.removeItem(STORAGE_KEY);
    return DEFAULT_SIMULASI_PROGRESS;
  } catch {
    return DEFAULT_SIMULASI_PROGRESS;
  }
}
