export interface MarketOverview {
  totalMarketCapUsd: number;
  totalVolume24hUsd: number;
  btcDominance: number;
  ethDominance: number;
  activeCryptos: number;
  fearGreedIndex: number;
  fearGreedLabel: 'Extreme Fear' | 'Fear' | 'Neutral' | 'Greed' | 'Extreme Greed';
  marketCapChange24h: number;
}

export const marketOverview: MarketOverview = {
  totalMarketCapUsd: 2.41e12,
  totalVolume24hUsd: 98.5e9,
  btcDominance: 54.2,
  ethDominance: 17.8,
  activeCryptos: 13842,
  fearGreedIndex: 72,
  fearGreedLabel: 'Greed',
  marketCapChange24h: 1.8,
};
