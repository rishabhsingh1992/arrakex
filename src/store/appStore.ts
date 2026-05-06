import { createContext, useContext } from 'react';

export type Currency = 'usd' | 'inr';

export interface AppContextValue {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const AppContext = createContext<AppContextValue>({
  currency: 'usd',
  setCurrency: () => {},
  darkMode: false,
  toggleDarkMode: () => {},
});

export const useAppContext = () => useContext(AppContext);
