export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  source: string;
  date: string;
  coins: string[];
  url: string;
}

const news: NewsArticle[] = [
  {
    id: '1',
    title: 'Bitcoin Surges Past $67K as ETF Inflows Hit Record High',
    summary: 'Bitcoin reached a new local high driven by unprecedented institutional demand through spot ETFs, with daily inflows exceeding $500M for the third consecutive day.',
    source: 'CoinDesk',
    date: '2026-05-06',
    coins: ['bitcoin'],
    url: '#',
  },
  {
    id: '2',
    title: 'Ethereum Dencun Upgrade Cuts Layer-2 Fees by 90%',
    summary: 'Following the Dencun hard fork, transaction fees on Ethereum Layer-2 networks have dropped dramatically, making DeFi accessible to a much wider audience.',
    source: 'The Block',
    date: '2026-05-06',
    coins: ['ethereum'],
    url: '#',
  },
  {
    id: '3',
    title: 'Solana Breaks Into Top 3 by Daily Active Users',
    summary: 'Solana has overtaken Ethereum in daily active wallets for the second month running, driven by meme coin activity and new DeFi protocols.',
    source: 'Decrypt',
    date: '2026-05-05',
    coins: ['solana'],
    url: '#',
  },
  {
    id: '4',
    title: 'Avalanche Partners with Major Asian Bank for RWA Tokenisation',
    summary: 'A top-tier Asian financial institution has announced a partnership with Avalanche to tokenise real-world assets worth over $2 billion on-chain.',
    source: 'CoinTelegraph',
    date: '2026-05-05',
    coins: ['avalanche-2'],
    url: '#',
  },
  {
    id: '5',
    title: 'XRP Legal Victory Sends Price Up 12% in 24 Hours',
    summary: 'Ripple secured a landmark court ruling affirming that XRP is not a security when sold to retail investors, triggering a sharp rally across the XRP market.',
    source: 'Reuters',
    date: '2026-05-05',
    coins: ['ripple'],
    url: '#',
  },
  {
    id: '6',
    title: 'Total Crypto Market Cap Crosses $2.4 Trillion',
    summary: 'The global cryptocurrency market capitalisation has crossed $2.4 trillion for the first time since the previous bull cycle, with Bitcoin and Ethereum leading the charge.',
    source: 'Bloomberg',
    date: '2026-05-04',
    coins: ['bitcoin', 'ethereum'],
    url: '#',
  },
  {
    id: '7',
    title: 'Cardano Hydra Head Protocol Achieves 1 Million TPS in Testnet',
    summary: 'Cardano\'s layer-2 scaling solution Hydra has demonstrated 1 million transactions per second on its latest testnet, raising optimism ahead of mainnet deployment.',
    source: 'Cardano Foundation',
    date: '2026-05-04',
    coins: ['cardano'],
    url: '#',
  },
  {
    id: '8',
    title: 'Chainlink CCIP Goes Live on 12 New Blockchains',
    summary: 'Chainlink\'s Cross-Chain Interoperability Protocol expanded to a dozen new networks, further cementing its role as the backbone of cross-chain DeFi infrastructure.',
    source: 'Chainlink Blog',
    date: '2026-05-03',
    coins: ['chainlink'],
    url: '#',
  },
  {
    id: '9',
    title: 'Dogecoin Community Votes to Fund Infrastructure Upgrade',
    summary: 'The Dogecoin Foundation has approved a community proposal to fund a major node infrastructure overhaul, aiming to reduce network fees and improve transaction speed.',
    source: 'Decrypt',
    date: '2026-05-03',
    coins: ['dogecoin'],
    url: '#',
  },
  {
    id: '10',
    title: 'BNB Chain Sets Record with 10M Daily Transactions',
    summary: 'BNB Chain processed over 10 million transactions in a single day, a new all-time high driven by GameFi activity and the growing BNB DeFi ecosystem.',
    source: 'BNB Chain Blog',
    date: '2026-05-02',
    coins: ['binancecoin'],
    url: '#',
  },
];

export default news;
