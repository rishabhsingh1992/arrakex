import { useState, useCallback } from 'react';
import { mockTransactions } from '../data/mockPortfolio';

export type TxType = 'buy' | 'sell';

export interface Transaction {
  id: string;
  coinId: string;
  type: TxType;
  quantity: number;
  priceUsd: number;
  date: string;
}

const STORAGE_KEY = 'arrakex_transactions';

function load(): Transaction[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === null) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mockTransactions));
      return mockTransactions;
    }
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

function save(txs: Transaction[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(txs));
}

export function useTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>(load);

  const add = useCallback((tx: Omit<Transaction, 'id'>) => {
    const entry: Transaction = { ...tx, id: `${Date.now()}-${Math.random().toString(36).slice(2)}` };
    setTransactions(prev => {
      const next = [entry, ...prev];
      save(next);
      return next;
    });
  }, []);

  const remove = useCallback((id: string) => {
    setTransactions(prev => {
      const next = prev.filter(t => t.id !== id);
      save(next);
      return next;
    });
  }, []);

  const forCoin = useCallback((coinId: string) => {
    return transactions.filter(t => t.coinId === coinId);
  }, [transactions]);

  return { transactions, add, remove, forCoin };
}
