import { useState, useEffect } from 'react';
import coins, { type Coin } from '../data/mockCoins';

export function useCoinDetail(id: string | undefined) {
  const [data, setData] = useState<Coin | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    const timer = setTimeout(() => {
      setData(coins.find(c => c.id === id) ?? null);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [id]);

  return { data, loading };
}
