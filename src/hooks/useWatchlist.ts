import { useState, useCallback } from 'react';

const STORAGE_KEY = 'arrakex_watchlist';

function load(): string[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
}

function save(ids: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(ids));
}

export function useWatchlist() {
  const [watched, setWatched] = useState<string[]>(load);

  const toggle = useCallback((coinId: string) => {
    setWatched(prev => {
      const next = prev.includes(coinId)
        ? prev.filter(id => id !== coinId)
        : [...prev, coinId];
      save(next);
      return next;
    });
  }, []);

  const isWatched = useCallback((coinId: string) => watched.includes(coinId), [watched]);

  return { watched, toggle, isWatched };
}
