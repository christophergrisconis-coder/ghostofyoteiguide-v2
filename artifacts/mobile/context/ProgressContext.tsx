import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QUESTS } from '@/data/quests';
import { COLLECTIBLE_GROUPS } from '@/data/collectibles';

const STORAGE_KEY = '@ghost_yotei_v1';

interface ProgressState {
  questCompletion: Record<string, boolean>;
  taskCompletion: Record<string, Record<number, boolean>>;
  collectibleCompletion: Record<string, boolean>;
  playerNotes: Record<string, string>;
  recentlyUpdated: string[];
}

const DEFAULT_STATE: ProgressState = {
  questCompletion: {},
  taskCompletion: {},
  collectibleCompletion: {},
  playerNotes: {},
  recentlyUpdated: [],
};

export interface CategoryStats {
  total: number;
  completed: number;
  percentage: number;
}

export interface CompletionStats {
  totalQuests: number;
  completedQuests: number;
  inProgressQuests: number;
  totalCollectibles: number;
  completedCollectibles: number;
  overallPercentage: number;
  categoryStats: Record<string, CategoryStats>;
}

interface ProgressContextType {
  state: ProgressState;
  stats: CompletionStats;
  isLoaded: boolean;
  toggleQuest: (questId: string) => void;
  toggleTask: (questId: string, taskIndex: number) => void;
  toggleCollectible: (collectibleId: string) => void;
  updateNotes: (questId: string, notes: string) => void;
  resetProgress: () => void;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

function computeStats(state: ProgressState): CompletionStats {
  const totalQuests = QUESTS.length;
  let completedQuests = 0;
  let inProgressQuests = 0;
  const categoryStats: Record<string, CategoryStats> = {};

  for (const quest of QUESTS) {
    const isComplete = state.questCompletion[quest.id] === true;
    const taskState = state.taskCompletion[quest.id] ?? {};
    const doneTasks = Object.values(taskState).filter(Boolean).length;
    const isInProgress = !isComplete && doneTasks > 0;

    if (isComplete) completedQuests++;
    if (isInProgress) inProgressQuests++;

    if (!categoryStats[quest.category]) {
      categoryStats[quest.category] = { total: 0, completed: 0, percentage: 0 };
    }
    categoryStats[quest.category].total++;
    if (isComplete) categoryStats[quest.category].completed++;
  }

  for (const cat of Object.values(categoryStats)) {
    cat.percentage = cat.total > 0 ? Math.round((cat.completed / cat.total) * 100) : 0;
  }

  const totalCollectibles = COLLECTIBLE_GROUPS.reduce((sum, g) => sum + g.total, 0);
  const completedCollectibles = Object.values(state.collectibleCompletion).filter(Boolean).length;

  const totalItems = totalQuests + totalCollectibles;
  const completedItems = completedQuests + completedCollectibles;
  const overallPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return {
    totalQuests,
    completedQuests,
    inProgressQuests,
    totalCollectibles,
    completedCollectibles,
    overallPercentage,
    categoryStats,
  };
}

function addToRecent(questId: string, current: string[]): string[] {
  return [questId, ...current.filter(id => id !== questId)].slice(0, 8);
}

function persist(newState: ProgressState): void {
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newState)).catch(() => {});
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ProgressState>(DEFAULT_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY)
      .then(data => {
        if (data) {
          try {
            setState(JSON.parse(data) as ProgressState);
          } catch {}
        }
      })
      .finally(() => setIsLoaded(true));
  }, []);

  const toggleQuest = useCallback((questId: string) => {
    setState(prev => {
      const next: ProgressState = {
        ...prev,
        questCompletion: { ...prev.questCompletion, [questId]: !prev.questCompletion[questId] },
        recentlyUpdated: addToRecent(questId, prev.recentlyUpdated),
      };
      persist(next);
      return next;
    });
  }, []);

  const toggleTask = useCallback((questId: string, taskIndex: number) => {
    setState(prev => {
      const questTasks = prev.taskCompletion[questId] ?? {};
      const next: ProgressState = {
        ...prev,
        taskCompletion: {
          ...prev.taskCompletion,
          [questId]: { ...questTasks, [taskIndex]: !questTasks[taskIndex] },
        },
        recentlyUpdated: addToRecent(questId, prev.recentlyUpdated),
      };
      persist(next);
      return next;
    });
  }, []);

  const toggleCollectible = useCallback((collectibleId: string) => {
    setState(prev => {
      const next: ProgressState = {
        ...prev,
        collectibleCompletion: {
          ...prev.collectibleCompletion,
          [collectibleId]: !prev.collectibleCompletion[collectibleId],
        },
      };
      persist(next);
      return next;
    });
  }, []);

  const updateNotes = useCallback((questId: string, notes: string) => {
    setState(prev => {
      const next: ProgressState = {
        ...prev,
        playerNotes: { ...prev.playerNotes, [questId]: notes },
      };
      persist(next);
      return next;
    });
  }, []);

  const resetProgress = useCallback(() => {
    setState(DEFAULT_STATE);
    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_STATE)).catch(() => {});
  }, []);

  const stats = useMemo(() => computeStats(state), [state]);

  return (
    <ProgressContext.Provider
      value={{ state, stats, isLoaded, toggleQuest, toggleTask, toggleCollectible, updateNotes, resetProgress }}
    >
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress(): ProgressContextType {
  const ctx = useContext(ProgressContext);
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider');
  return ctx;
}
