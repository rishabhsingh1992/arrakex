import { useAppContext } from '../store/appStore';
import type { Currency } from '../store/appStore';

export function useCurrency() {
  const { currency, setCurrency } = useAppContext();

  function formatPrice(usd: number, inr: number): string {
    if (currency === 'inr') {
      return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: usd < 1 ? 4 : 2 }).format(inr);
    }
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: usd < 1 ? 4 : 2 }).format(usd);
  }

  function formatMarketCap(usd: number, inr: number): string {
    const val = currency === 'inr' ? inr : usd;
    const sym = currency === 'inr' ? '₹' : '$';
    if (val >= 1e12) return `${sym}${(val / 1e12).toFixed(2)}T`;
    if (val >= 1e9) return `${sym}${(val / 1e9).toFixed(2)}B`;
    if (val >= 1e6) return `${sym}${(val / 1e6).toFixed(2)}M`;
    return `${sym}${val.toLocaleString()}`;
  }

  return { currency, setCurrency: setCurrency as (c: Currency) => void, formatPrice, formatMarketCap };
}
