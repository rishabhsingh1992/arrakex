# Arrakex — Implementation Tasks

Format: `[ ] PRIORITY | CATEGORY | Description | File`

Priority levels: **P0** critical · **P1** high · **P2** medium · **P3** polish

---

## Target Folder Structure

```
src/
├── pages/
│   ├── Home.tsx
│   ├── CoinDetail.tsx
│   ├── Portfolio.tsx
│   └── Search.tsx
├── components/
│   ├── CoinCard.tsx
│   ├── PriceChart.tsx
│   ├── CoinSkeleton.tsx
│   ├── CurrencyToggle.tsx
│   └── SearchBar.tsx
├── hooks/
│   ├── useCoins.ts
│   ├── useCoinDetail.ts
│   ├── usePortfolio.ts
│   ├── useCurrency.ts
│   └── useDebounce.ts
├── services/
│   └── coingecko.ts
├── store/
│   └── appStore.ts
└── theme/
    └── variables.css
```

---

## P0 — Foundation

- [ ] P0 | SERVICES  | Create CoinGecko REST client with typed responses for `/coins/markets` and `/coins/{id}` | `src/services/coingecko.ts`
- [ ] P0 | HOOKS     | `useCoins` — fetch paginated market list (id, name, symbol, price, 24h change, image) | `src/hooks/useCoins.ts`
- [ ] P0 | STORE     | `AppContext` — provide active currency (`usd`/`inr`) and setter via React context | `src/store/appStore.ts`
- [ ] P0 | PAGES     | Scaffold `Home` page — replace blank starter with `IonList` wired to `useCoins` | `src/pages/Home.tsx`
- [ ] P0 | ROUTER    | Register `/`, `/coin/:id`, `/portfolio`, `/search` routes in `App.tsx` | `src/App.tsx`

---

## P1 — Core Features

- [ ] P1 | COMPONENTS | `CoinCard` — display coin row: logo, name, symbol, current price, 24h change badge | `src/components/CoinCard.tsx`
- [ ] P1 | COMPONENTS | `CoinSkeleton` — `IonSkeletonText` placeholder matching `CoinCard` layout | `src/components/CoinSkeleton.tsx`
- [ ] P1 | PAGES      | Render skeleton list (10 items) on `Home` while `useCoins` is loading | `src/pages/Home.tsx`
- [ ] P1 | HOOKS      | `useCurrency` — read/write active currency from context; format prices with `Intl.NumberFormat` | `src/hooks/useCurrency.ts`
- [ ] P1 | COMPONENTS | `CurrencyToggle` — `IonSegment` with USD / INR options; dispatches to `AppContext` | `src/components/CurrencyToggle.tsx`
- [ ] P1 | SERVICES   | Extend CoinGecko client — `/coins/{id}/market_chart` for sparkline data (7d, daily) | `src/services/coingecko.ts`
- [ ] P1 | HOOKS      | `useCoinDetail` — fetch single coin metadata + 7-day price history | `src/hooks/useCoinDetail.ts`
- [ ] P1 | PAGES      | `CoinDetail` page — header with price, 24h change, and `PriceChart` component | `src/pages/CoinDetail.tsx`
- [ ] P1 | COMPONENTS | `PriceChart` — SVG sparkline (or canvas) of 7-day price data from `useCoinDetail` | `src/components/PriceChart.tsx`

---

## P2 — Portfolio & Search

- [ ] P2 | HOOKS      | `usePortfolio` — CRUD against `@capacitor/preferences` (add/remove holding, read quantities) | `src/hooks/usePortfolio.ts`
- [ ] P2 | PAGES      | `Portfolio` page — list holdings with current value (quantity × live price) and total in header | `src/pages/Portfolio.tsx`
- [ ] P2 | PAGES      | Add/remove holding sheet on `CoinDetail` — input quantity, persist via `usePortfolio` | `src/pages/CoinDetail.tsx`
- [ ] P2 | HOOKS      | `useDebounce` — generic hook that delays a value by N ms (default 400 ms) | `src/hooks/useDebounce.ts`
- [ ] P2 | COMPONENTS | `SearchBar` — `IonSearchbar` that feeds `useDebounce` before hitting CoinGecko `/search` | `src/components/SearchBar.tsx`
- [ ] P2 | SERVICES   | Add `/search?query=` endpoint to CoinGecko client | `src/services/coingecko.ts`
- [ ] P2 | PAGES      | `Search` page — `SearchBar` + results list using debounced query | `src/pages/Search.tsx`
- [ ] P2 | PAGES      | Pull-to-refresh (`IonRefresher`) on `Home` and `Portfolio` | `src/pages/Home.tsx`, `src/pages/Portfolio.tsx`

---

## P3 — Polish & Edge Cases

- [ ] P3 | COMPONENTS | Error card component — shown when any API call fails with retry button | `src/components/ErrorCard.tsx`
- [ ] P3 | PAGES      | Empty state illustration on `Portfolio` when no holdings are saved | `src/pages/Portfolio.tsx`
- [ ] P3 | PAGES      | Empty state on `Search` when query returns zero results | `src/pages/Search.tsx`
- [ ] P3 | THEME      | Tune Ionic CSS variables — brand colours, font sizes, card radius | `src/theme/variables.css`
- [ ] P3 | SERVICES   | Add request-level error handling + exponential back-off retry (max 3 attempts) | `src/services/coingecko.ts`
- [ ] P3 | PAGES      | Infinite scroll (`IonInfiniteScroll`) on `Home` to load next page of coins | `src/pages/Home.tsx`
- [ ] P3 | COMPONENTS | Animate 24h change badge colour transition (green ↔ red) on price update | `src/components/CoinCard.tsx`
- [ ] P3 | STORE      | Persist last-used currency to `@capacitor/preferences` so it survives app restart | `src/store/appStore.ts`
