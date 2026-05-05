# Arrakex — Crypto Tracker

A mobile-first cryptocurrency tracking app built with Ionic React and Capacitor. Live prices, portfolio management, and chart views powered by the free CoinGecko public API.

---

## Stack

| Layer          | Technology                      |
|----------------|---------------------------------|
| UI Framework   | Ionic React 8                   |
| Frontend       | React 19 + TypeScript 5.9       |
| Router         | React Router v5                 |
| Native Bridge  | Capacitor 8                     |
| Build Tool     | Vite 5                          |
| Unit Tests     | Vitest + Testing Library        |
| E2E Tests      | Cypress                         |

---

## Prerequisites

- Node.js 20+
- npm 10+
- Ionic CLI: `npm install -g @ionic/cli`
- Android Studio (for Android builds)
- Xcode on macOS (for iOS builds)

---

## Setup

```bash
git clone <repo-url>
cd arrakex
npm install
```

### Run in browser

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Run tests

```bash
npm run test.unit     # Vitest unit tests
npm run test.e2e      # Cypress e2e tests
```

### Deploy to Android

```bash
npx cap add android
npx cap sync
npx cap open android
```

### Deploy to iOS (macOS only)

```bash
npx cap add ios
npx cap sync
npx cap open ios
```

---

## Folder Structure

```
src/
├── pages/          # Route-level page components
│   ├── Home.tsx         Market list (default route)
│   ├── CoinDetail.tsx   Single coin + price chart
│   ├── Portfolio.tsx    Portfolio tracker
│   └── Search.tsx       Debounced coin search
├── components/     # Reusable UI components
│   ├── CoinCard.tsx       Coin list item with 24h change
│   ├── PriceChart.tsx     Sparkline chart
│   ├── CoinSkeleton.tsx   Skeleton loader
│   ├── CurrencyToggle.tsx USD / INR switcher
│   └── SearchBar.tsx      Debounced search input
├── hooks/          # Custom React hooks
│   ├── useCoins.ts        Fetch paginated market data
│   ├── useCoinDetail.ts   Fetch single coin OHLC + metadata
│   ├── usePortfolio.ts    Capacitor Preferences CRUD
│   ├── useCurrency.ts     Active currency state
│   └── useDebounce.ts     Generic debounce hook
├── services/       # External API clients
│   └── coingecko.ts       CoinGecko REST client
├── store/          # Global app state
│   └── appStore.ts        Currency + settings context
└── theme/          # Ionic CSS variable overrides
    └── variables.css
```

---

## Environment Variables

No API key is required — the CoinGecko free public API is used for all data.

Create a `.env` file at the project root to override defaults:

| Variable                    | Required | Default                                  | Description                        |
|-----------------------------|----------|------------------------------------------|------------------------------------|
| `VITE_COINGECKO_BASE_URL`   | No       | `https://api.coingecko.com/api/v3`       | CoinGecko API base URL             |
| `VITE_DEFAULT_CURRENCY`     | No       | `usd`                                    | Default display currency (`usd` or `inr`) |
| `VITE_COINS_PER_PAGE`       | No       | `50`                                     | Number of coins loaded per page    |

---

## Key Features

- Live coin prices with 24h percentage change
- Coin detail page with price chart (sparkline)
- Portfolio tracker persisted via Capacitor Preferences
- Currency toggle between USD and INR
- Debounced search across all coins
- Skeleton loaders during data fetch
