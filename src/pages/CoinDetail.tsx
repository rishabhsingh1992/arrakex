import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonBackButton, IonButtons, IonSkeletonText, IonBadge,
  IonItem, IonLabel, IonInput, IonButton, IonCard, IonCardContent,
  IonList, IonListHeader, IonIcon, IonToast,
} from '@ionic/react';
import { star, starOutline } from 'ionicons/icons';
import PriceChart from '../components/PriceChart';
import { useCoinDetail } from '../hooks/useCoinDetail';
import { useCurrency } from '../hooks/useCurrency';
import { usePortfolio } from '../hooks/usePortfolio';
import { useWatchlist } from '../hooks/useWatchlist';

const CoinDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data: coin, loading } = useCoinDetail(id);
  const { formatPrice, formatMarketCap } = useCurrency();
  const { getQuantity, upsert } = usePortfolio();
  const { isWatched, toggle: toggleWatch } = useWatchlist();
  const [qty, setQty] = useState<string>('');
  const [toast, setToast] = useState('');

  const quantity = getQuantity(id);
  const isPositive = (coin?.price_change_percentage_24h ?? 0) >= 0;
  const watched = isWatched(id);

  function saveHolding() {
    const n = parseFloat(qty);
    if (!isNaN(n) && n >= 0) {
      upsert(id, n);
      setQty('');
      setToast('Portfolio updated');
    }
  }

  function handleWatch() {
    toggleWatch(id);
    setToast(watched ? 'Removed from Watchlist' : 'Added to Watchlist');
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>{loading ? '…' : coin?.name}</IonTitle>
          <IonButtons slot="end">
            <IonButton fill="clear" onClick={handleWatch}>
              <IonIcon slot="icon-only" icon={watched ? star : starOutline} color={watched ? 'warning' : undefined} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {loading ? (
          <div style={{ padding: 16 }}>
            <IonSkeletonText animated style={{ width: '40%', height: 32, marginBottom: 8 }} />
            <IonSkeletonText animated style={{ width: '25%', height: 20 }} />
            <IonSkeletonText animated style={{ width: '100%', height: 120, marginTop: 16 }} />
          </div>
        ) : coin ? (
          <>
            <div style={{ padding: '16px 16px 0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 4 }}>
                <img src={coin.image} alt={coin.name} width={40} height={40} style={{ borderRadius: '50%' }} />
                <div>
                  <div style={{ fontSize: 26, fontWeight: 700 }}>
                    {formatPrice(coin.current_price_usd, coin.current_price_inr)}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 2 }}>
                    <span style={{ color: 'var(--ion-color-medium)', fontSize: 14 }}>
                      {coin.symbol.toUpperCase()}
                    </span>
                    <IonBadge color={isPositive ? 'success' : 'danger'}>
                      {isPositive ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}% (24h)
                    </IonBadge>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ padding: '8px 0' }}>
              <PriceChart
                prices={coin.sparkline_7d}
                positive={isPositive}
                width={window.innerWidth}
                height={120}
              />
              <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--ion-color-medium)', margin: 0 }}>
                7-day price chart
              </p>
            </div>

            <IonList inset>
              <IonListHeader><IonLabel>Market Stats</IonLabel></IonListHeader>
              <IonItem>
                <IonLabel>Market Cap</IonLabel>
                <IonLabel slot="end" style={{ textAlign: 'right' }}>
                  {formatMarketCap(coin.market_cap_usd, coin.market_cap_inr)}
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Rank</IonLabel>
                <IonLabel slot="end" style={{ textAlign: 'right' }}>#{coin.market_cap_rank}</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>24h Volume</IonLabel>
                <IonLabel slot="end" style={{ textAlign: 'right' }}>
                  {formatMarketCap(coin.total_volume_usd, coin.total_volume_usd * 83.3)}
                </IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>All-Time High</IonLabel>
                <IonLabel slot="end" style={{ textAlign: 'right' }}>
                  {formatPrice(coin.ath_usd, coin.ath_usd * 83.3)}
                </IonLabel>
              </IonItem>
              <IonItem lines="none">
                <IonLabel>Circulating Supply</IonLabel>
                <IonLabel slot="end" style={{ textAlign: 'right' }}>
                  {new Intl.NumberFormat().format(coin.circulating_supply)} {coin.symbol.toUpperCase()}
                </IonLabel>
              </IonItem>
            </IonList>

            <IonCard style={{ margin: '0 16px 16px' }}>
              <IonCardContent>
                <h3 style={{ fontWeight: 600, marginBottom: 8 }}>About {coin.name}</h3>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--ion-color-medium)' }}>
                  {coin.description}
                </p>
              </IonCardContent>
            </IonCard>

            <IonList inset>
              <IonListHeader>
                <IonLabel>Portfolio</IonLabel>
              </IonListHeader>
              {quantity > 0 && (
                <IonItem>
                  <IonLabel>Your holding</IonLabel>
                  <IonLabel slot="end" style={{ textAlign: 'right' }}>
                    {quantity} {coin.symbol.toUpperCase()}
                    <p style={{ fontSize: 12, color: 'var(--ion-color-medium)' }}>
                      ≈ {formatPrice(quantity * coin.current_price_usd, quantity * coin.current_price_inr)}
                    </p>
                  </IonLabel>
                </IonItem>
              )}
              <IonItem>
                <IonLabel position="stacked">Quantity ({coin.symbol.toUpperCase()})</IonLabel>
                <IonInput
                  type="number"
                  placeholder="0.00"
                  value={qty}
                  onIonInput={e => setQty(String(e.detail.value ?? ''))}
                  min={0}
                />
              </IonItem>
              <IonItem lines="none">
                <IonButton expand="block" onClick={saveHolding} style={{ width: '100%' }}>
                  {quantity > 0 ? 'Update Holding' : 'Add to Portfolio'}
                </IonButton>
              </IonItem>
            </IonList>
          </>
        ) : (
          <div style={{ padding: 32, textAlign: 'center', color: 'var(--ion-color-medium)' }}>
            Coin not found.
          </div>
        )}

        <IonToast isOpen={!!toast} message={toast} duration={1800} onDidDismiss={() => setToast('')} position="bottom" />
      </IonContent>
    </IonPage>
  );
};

export default CoinDetail;
