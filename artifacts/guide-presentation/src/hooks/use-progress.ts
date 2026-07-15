import { createContext, useContext, useState, useEffect, useCallback } from 'react';

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ProgressContextValue {
  checked: Set<string>;
  toggle: (id: string) => void;
  isChecked: (id: string) => boolean;
  countChecked: (ids: string[]) => number;
  reset: () => void;
}

// ── Storage ───────────────────────────────────────────────────────────────────

const STORAGE_KEY = 'yotei-guide:progress';

function loadProgress(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as string[]);
  } catch {
    return new Set();
  }
}

function saveProgress(set: Set<string>): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  } catch {
    // localStorage unavailable — silently ignore
  }
}

// ── Context ───────────────────────────────────────────────────────────────────

export const ProgressContext = createContext<ProgressContextValue>({
  checked: new Set(),
  toggle: () => {},
  isChecked: () => false,
  countChecked: () => 0,
  reset: () => {},
});

export function useProgress(): ProgressContextValue {
  return useContext(ProgressContext);
}

// ── Hook (for use inside ProgressProvider) ───────────────────────────────────

export function useProgressState(): ProgressContextValue {
  const [checked, setChecked] = useState<Set<string>>(() => loadProgress());

  // Sync across browser tabs
  useEffect(() => {
    const handler = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setChecked(loadProgress());
    };
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, []);

  const toggle = useCallback((id: string) => {
    setChecked(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      saveProgress(next);
      return next;
    });
  }, []);

  const isChecked = useCallback((id: string) => checked.has(id), [checked]);

  const countChecked = useCallback(
    (ids: string[]) => ids.filter(id => checked.has(id)).length,
    [checked],
  );

  const reset = useCallback(() => {
    const empty = new Set<string>();
    setChecked(empty);
    saveProgress(empty);
  }, []);

  return { checked, toggle, isChecked, countChecked, reset };
}
