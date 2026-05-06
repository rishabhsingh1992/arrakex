import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonList, IonItem, IonLabel, IonAvatar, IonBadge,
  IonRefresher, IonRefresherContent, IonButtons, IonButton, IonIcon,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { receiptOutline } from 'ionicons/icons';
import type { Coin } from '../data/mockCoins';
import { usePortfolio } from '../hooks/usePortfolio';
import { useCoins } from '../hooks/useCoins';
import { useCurrency } from '../hooks/useCurrency';

interface EnrichedHolding {
  coin: Coin;
  quantity: number;
  valueUsd: number;
  valueInr: number;
}

const Portfolio: React.FC = () => {
  const { holdings } = usePortfolio();
  const { data: coins, refresh } = useCoins();
  const { formatPrice, formatMarketCap } = useCurrency();
  const history = useHistory();

  const enriched: EnrichedHolding[] = holdings
    .map(h => {
      const coin = coins.find(c => c.id === h.coinId);
      if (!coin) return null;
      return { coin, quantity: h.quantity, valueUsd: h.quantity * coin.current_price_usd, valueInr: h.quantity * coin.current_price_inr };
    })
    .filter((e): e is EnrichedHolding => e !== null);

  const totalUsd = enriched.reduce((s, e) => s + e.valueUsd, 0);
  const totalInr = enriched.reduce((s, e) => s + e.valueInr, 0);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Portfolio</IonTitle>
          <IonButtons slot="end">
            <IonButton fill="clear" onClick={() => history.push('/transactions')}>
              <IonIcon slot="icon-only" icon={receiptOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Portfolio</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonRefresher slot="fixed" onIonRefresh={e => { refresh(); setTimeout(() => e.detail.complete(), 700); }}>
          <IonRefresherContent />
        </IonRefresher>

        {enriched.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📊</div>
            <h2 style={{ fontWeight: 600, marginBottom: 8 }}>No holdings yet</h2>
            <p style={{ color: 'var(--ion-color-medium)' }}>
              Visit a coin and add it to your portfolio.
            </p>
          </div>
        ) : (
          <>
            <div style={{ padding: '24px 16px 8px', textAlign: 'center' }}>
              <p style={{ margin: 0, color: 'var(--ion-color-medium)', fontSize: 13 }}>Total Value</p>
              <h1 style={{ margin: '4px 0', fontSize: 32, fontWeight: 700 }}>
                {formatMarketCap(totalUsd, totalInr)}
              </h1>
            </div>

            <IonList>
              {enriched.map(({ coin, quantity, valueUsd, valueInr }) => {
                const isPositive = coin.price_change_percentage_24h >= 0;
                return (
                  <IonItem key={coin.id} routerLink={`/coin/${coin.id}`} detail={false} lines="full">
                    <IonAvatar slot="start" style={{ width: 40, height: 40 }}>
                      <img src={coin.image} alt={coin.name} />
                    </IonAvatar>
                    <IonLabel>
                      <h2 style={{ fontWeight: 600 }}>{coin.name}</h2>
                      <p style={{ color: 'var(--ion-color-medium)', fontSize: 13 }}>
                        {quantity} {coin.symbol.toUpperCase()}
                      </p>
                    </IonLabel>
                    <div slot="end" style={{ textAlign: 'right' }}>
                      <p style={{ fontWeight: 600, margin: 0 }}>
                        {formatPrice(valueUsd, valueInr)}
                      </p>
                      <IonBadge color={isPositive ? 'success' : 'danger'} style={{ fontSize: 11, marginTop: 4 }}>
                        {isPositive ? '+' : ''}{coin.price_change_percentage_24h.toFixed(2)}%
                      </IonBadge>
                    </div>
                  </IonItem>
                );
              })}
            </IonList>
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Portfolio;
