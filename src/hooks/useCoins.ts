import { useState, useEffect } from 'react';
import coins, { type Coin } from '../data/mockCoins';

export function useCoins() {
  const [data, setData] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = setTimeout(() => {
      setData(coins);
      setLoading(false);
    }, 800);
    return () => clearTimeout(id);
  }, []);

  function refresh() {
    setLoading(true);
    setTimeout(() => setLoading(false), 600);
  }

  return { data, loading, refresh };
}
