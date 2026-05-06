import { useState, useCallback } from 'react';
import { mockWatchlist } from '../data/mockPortfolio';

const STORAGE_KEY = 'arrakex_watchlist';

function load(): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === null) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockWatchlist));
      return mockWatchlist;
    }
    return JSON.parse(stored);
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
