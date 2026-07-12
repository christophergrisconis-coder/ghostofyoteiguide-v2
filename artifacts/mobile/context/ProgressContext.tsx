import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';
import * as DocumentPicker from 'expo-document-picker';
import { Platform } from 'react-native';
import { QUESTS } from '@/data/quests';
import { COLLECTIBLE_IDS, COLLECTIBLE_GROUPS } from '@/data/collectibles';
import { TROPHIES } from '@/data/trophies';

const STORAGE_KEY = '@ghost_yotei_v1';

interface ProgressState {
  questCompletion: Record<string, boolean>;
  taskCompletion: Record<string, Record<number, boolean>>;
  collectibleCompletion: Record<string, boolean>;
  trophyCompletion: Record<string, boolean>;
  playerNotes: Record<string, string>;
  recentlyUpdated: string[];
}

const DEFAULT_STATE: ProgressState = {
  questCompletion: {},
  taskCompletion: {},
  collectibleCompletion: {},
  trophyCompletion: {},
  playerNotes: {},
  recentlyUpdated: [],
};

export interface CategoryStats {
  total: number;
  completed: number;
  percentage: number;
}

export interface TrophyStats {
  total: number;
  completed: number;
  percentage: number;
  byTier: Record<string, { total: number; completed: number }>;
}

export interface CompletionStats {
  totalQuests: number;
  completedQuests: number;
  inProgressQuests: number;
  totalCollectibles: number;
  completedCollectibles: number;
  totalTrophies: number;
  completedTrophies: number;
  overallPercentage: number;
  categoryStats: Record<string, CategoryStats>;
  trophyStats: TrophyStats;
}

interface ProgressContextType {
  state: ProgressState;
  stats: CompletionStats;
  isLoaded: boolean;
  toggleQuest: (questId: string) => void;
  toggleTask: (questId: string, taskIndex: number) => void;
  toggleCollectible: (collectibleId: string) => void;
  toggleTrophy: (trophyId: string) => void;
  updateNotes: (questId: string, notes: string) => void;
  resetProgress: () => void;
  exportProgress: () => Promise<void>;
  importProgress: () => Promise<{ success: boolean; message: string }>;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

// Precompute valid ID sets to guard against stale keys from older app versions.
// Completion counts only recognise IDs that exist in the current catalog.
const VALID_QUEST_IDS = new Set(QUESTS.map(q => q.id));
const VALID_TROPHY_IDS = new Set(TROPHIES.map(t => t.id));
const TOTAL_COLLECTIBLES = COLLECTIBLE_GROUPS.reduce((sum, g) => sum + g.total, 0);

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

  // Guard against stale collectible keys from older app versions.
  const completedCollectibles = Object.entries(state.collectibleCompletion).filter(
    ([id, done]) => done && COLLECTIBLE_IDS.has(id),
  ).length;
  const totalCollectibles = TOTAL_COLLECTIBLES;

  // Guard against stale trophy keys from older app versions.
  const completedTrophies = Object.entries(state.trophyCompletion).filter(
    ([id, done]) => done && VALID_TROPHY_IDS.has(id),
  ).length;
  const totalTrophies = TROPHIES.length;

  const trophyByTier: Record<string, { total: number; completed: number }> = {};
  for (const trophy of TROPHIES) {
    if (!trophyByTier[trophy.tier]) {
      trophyByTier[trophy.tier] = { total: 0, completed: 0 };
    }
    trophyByTier[trophy.tier].total++;
    if (state.trophyCompletion[trophy.id] && VALID_TROPHY_IDS.has(trophy.id)) {
      trophyByTier[trophy.tier].completed++;
    }
  }

  const trophyStats: TrophyStats = {
    total: totalTrophies,
    completed: completedTrophies,
    percentage: totalTrophies > 0 ? Math.round((completedTrophies / totalTrophies) * 100) : 0,
    byTier: trophyByTier,
  };

  // Overall: quests + collectibles + trophies all count equally
  const totalItems = totalQuests + totalCollectibles + totalTrophies;
  const completedItems = completedQuests + completedCollectibles + completedTrophies;
  const overallPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  return {
    totalQuests,
    completedQuests,
    inProgressQuests,
    totalCollectibles,
    completedCollectibles,
    totalTrophies,
    completedTrophies,
    overallPercentage,
    categoryStats,
    trophyStats,
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
            const parsed = JSON.parse(data) as Partial<ProgressState>;
            // Merge with defaults to handle missing keys from older saves.
            // Stale keys in collectible/trophy/quest completion are ignored at
            // stat-computation time (see VALID_*_IDS guards above) — no need
            // to prune here, which avoids unnecessary re-writes on load.
            setState({ ...DEFAULT_STATE, ...parsed });
          } catch {}
        }
      })
      .finally(() => setIsLoaded(true));
  }, []);

  const toggleQuest = useCallback((questId: string) => {
    if (!VALID_QUEST_IDS.has(questId)) return; // ignore unknown IDs
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
    if (!COLLECTIBLE_IDS.has(collectibleId)) return; // ignore stale/unknown IDs
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

  const toggleTrophy = useCallback((trophyId: string) => {
    if (!VALID_TROPHY_IDS.has(trophyId)) return; // ignore stale/unknown IDs
    setState(prev => {
      const next: ProgressState = {
        ...prev,
        trophyCompletion: {
          ...prev.trophyCompletion,
          [trophyId]: !prev.trophyCompletion[trophyId],
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

  const exportProgress = useCallback(async () => {
    const snapshot = {
      version: 1,
      exportedAt: new Date().toISOString(),
      data: state,
    };
    const json = JSON.stringify(snapshot, null, 2);

    if (Platform.OS === 'web') {
      // Web: trigger a download via a data URL
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'ghost-yotei-progress.json';
      a.click();
      URL.revokeObjectURL(url);
      return;
    }

    const fileUri = FileSystem.cacheDirectory + 'ghost-yotei-progress.json';
    await FileSystem.writeAsStringAsync(fileUri, json, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    const canShare = await Sharing.isAvailableAsync();
    if (canShare) {
      await Sharing.shareAsync(fileUri, {
        mimeType: 'application/json',
        dialogTitle: 'Save your Ghost of Yotei progress',
        UTI: 'public.json',
      });
    }
  }, [state]);

  const importProgress = useCallback(async (): Promise<{ success: boolean; message: string }> => {
    try {
      if (Platform.OS === 'web') {
        // Web: use a hidden file input
        return await new Promise(resolve => {
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = 'application/json,.json';
          input.onchange = async () => {
            const file = input.files?.[0];
            if (!file) {
              resolve({ success: false, message: 'No file selected.' });
              return;
            }
            try {
              const text = await file.text();
              const parsed = JSON.parse(text);
              const restored = parsed?.data ?? parsed;
              if (
                typeof restored.questCompletion !== 'object' ||
                typeof restored.collectibleCompletion !== 'object'
              ) {
                resolve({ success: false, message: 'File does not look like a valid Ghost of Yotei backup.' });
                return;
              }
              const next: ProgressState = { ...DEFAULT_STATE, ...restored };
              setState(next);
              await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
              resolve({ success: true, message: 'Progress restored successfully.' });
            } catch {
              resolve({ success: false, message: 'Could not read the selected file.' });
            }
          };
          input.click();
        });
      }

      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/json', 'public.json', 'text/plain'],
        copyToCacheDirectory: true,
      });

      if (result.canceled || !result.assets?.[0]) {
        return { success: false, message: 'Import cancelled.' };
      }

      const asset = result.assets[0];
      const text = await FileSystem.readAsStringAsync(asset.uri, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      const parsed = JSON.parse(text);
      // Support both the versioned wrapper { version, exportedAt, data } and raw state dumps
      const restored = parsed?.data ?? parsed;

      if (
        typeof restored !== 'object' ||
        typeof restored.questCompletion !== 'object' ||
        typeof restored.collectibleCompletion !== 'object'
      ) {
        return { success: false, message: 'File does not look like a valid Ghost of Yotei backup.' };
      }

      const next: ProgressState = { ...DEFAULT_STATE, ...restored };
      setState(next);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return { success: true, message: 'Progress restored successfully.' };
    } catch (err) {
      return { success: false, message: 'Could not read the selected file.' };
    }
  }, []);

  const stats = useMemo(() => computeStats(state), [state]);

  return (
    <ProgressContext.Provider
      value={{ state, stats, isLoaded, toggleQuest, toggleTask, toggleCollectible, toggleTrophy, updateNotes, resetProgress, exportProgress, importProgress }}
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
