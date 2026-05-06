import type { PortfolioEntry } from './mockCoins';
import type { Transaction } from '../hooks/useTransactions';

export const mockPortfolio: PortfolioEntry[] = [
  { coinId: 'bitcoin',   quantity: 0.5   },
  { coinId: 'ethereum',  quantity: 3.2   },
  { coinId: 'solana',    quantity: 45    },
  { coinId: 'chainlink', quantity: 120   },
  { coinId: 'dogecoin',  quantity: 5000  },
];

export const mockWatchlist: string[] = [
  'bitcoin',
  'ethereum',
  'solana',
  'binancecoin',
  'ripple',
  'avalanche-2',
];

export const mockTransactions: Transaction[] = [
  { id: 'mock-1', coinId: 'bitcoin',   type: 'buy',  quantity: 0.3,  priceUsd: 58200, date: '2025-11-12T09:00:00Z' },
  { id: 'mock-2', coinId: 'bitcoin',   type: 'buy',  quantity: 0.2,  priceUsd: 62100, date: '2026-01-05T14:30:00Z' },
  { id: 'mock-3', coinId: 'ethereum',  type: 'buy',  quantity: 2.0,  priceUsd: 2950,  date: '2025-10-20T10:15:00Z' },
  { id: 'mock-4', coinId: 'ethereum',  type: 'buy',  quantity: 1.2,  priceUsd: 3180,  date: '2026-02-14T16:00:00Z' },
  { id: 'mock-5', coinId: 'solana',    type: 'buy',  quantity: 60,   priceUsd: 145,   date: '2025-12-01T08:45:00Z' },
  { id: 'mock-6', coinId: 'solana',    type: 'sell', quantity: 15,   priceUsd: 168,   date: '2026-03-10T11:20:00Z' },
  { id: 'mock-7', coinId: 'chainlink', type: 'buy',  quantity: 120,  priceUsd: 12.4,  date: '2025-09-08T13:00:00Z' },
  { id: 'mock-8', coinId: 'dogecoin',  type: 'buy',  quantity: 5000, priceUsd: 0.135, date: '2026-01-20T17:30:00Z' },
];
