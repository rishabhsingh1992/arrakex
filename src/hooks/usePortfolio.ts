import { useState, useCallback } from 'react';
import type { PortfolioEntry } from '../data/mockCoins';

const STORAGE_KEY = 'arrakex_portfolio';

function load(): PortfolioEntry[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
  } catch {
    return [];
  }
}

function save(entries: PortfolioEntry[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

export function usePortfolio() {
  const [holdings, setHoldings] = useState<PortfolioEntry[]>(load);

  const upsert = useCallback((coinId: string, quantity: number) => {
    setHoldings(prev => {
      const next = prev.filter(e => e.coinId !== coinId);
      if (quantity > 0) next.push({ coinId, quantity });
      save(next);
      return next;
    });
  }, []);

  const remove = useCallback((coinId: string) => {
    setHoldings(prev => {
      const next = prev.filter(e => e.coinId !== coinId);
      save(next);
      return next;
    });
  }, []);

  const getQuantity = useCallback((coinId: string) => {
    return holdings.find(e => e.coinId === coinId)?.quantity ?? 0;
  }, [holdings]);

  return { holdings, upsert, remove, getQuantity };
}
