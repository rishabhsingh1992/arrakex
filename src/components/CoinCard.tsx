import { useState } from 'react';
import { IonItem, IonLabel, IonAvatar, IonBadge, IonButton, IonIcon, IonToast } from '@ionic/react';
import { star, starOutline } from 'ionicons/icons';
import type { Coin } from '../data/mockCoins';
import { useCurrency } from '../hooks/useCurrency';
import { useWatchlist } from '../hooks/useWatchlist';

interface Props {
  coin: Coin;
}

const CoinCard: React.FC<Props> = ({ coin }) => {
  const { formatPrice } = useCurrency();
  const { isWatched, toggle } = useWatchlist();
  const [toast, setToast] = useState('');
  const isPositive = coin.price_change_percentage_24h >= 0;
  const watched = isWatched(coin.id);

  function handleStar(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
    toggle(coin.id);
    setToast(watched ? `Removed from Watchlist` : `Added to Watchlist`);
  }

  return (
    <>
      <IonItem routerLink={`/coin/${coin.id}`} detail={false} lines="full">
        <IonAvatar slot="start" style={{ width: 40, height: 40 }}>
          <img src={coin.image} alt={coin.name} onError={(e) => { (e.target as HTMLImageElement).src = `https://via.placeholder.com/40/6c5ce7/fff?text=${coin.symbol[0]}`; }} />
        </IonAvatar>
        <IonLabel>
          <h2 style={{ fontWeight: 600 }}>{coin.name}</h2>
          <p style={{ color: 'var(--ion-color-medium)', fontSize: 13 }}>
            {coin.symbol.toUpperCase()} · #{coin.market_cap_rank}
          </p>
        </IonLabel>
        <div slot="end" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ fontWeight: 600, margin: 0 }}>
              {formatPrice(coin.current_price_usd, coin.current_price_inr)}
            </p>
            <IonBadge color={isPositive ? 'success' : 'danger'} style={{ fontSize: 11, marginTop: 4 }}>
              {isPositive ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
            </IonBadge>
          </div>
          <IonButton fill="clear" size="small" onClick={handleStar} style={{ '--padding-start': '4px', '--padding-end': '4px' }}>
            <IonIcon slot="icon-only" icon={watched ? star : starOutline} color={watched ? 'warning' : 'medium'} />
          </IonButton>
        </div>
      </IonItem>
      <IonToast isOpen={!!toast} message={toast} duration={1800} onDidDismiss={() => setToast('')} position="bottom" />
    </>
  );
};

export default CoinCard;
