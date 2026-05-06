import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonBackButton, IonButtons, IonCard, IonCardContent,
  IonGrid, IonRow, IonCol, IonBadge, IonList, IonItem, IonLabel,
} from '@ionic/react';
import { marketOverview } from '../data/mockMarket';
import coins from '../data/mockCoins';

function fmt(n: number): string {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  return `$${(n / 1e6).toFixed(2)}M`;
}

function fearColor(index: number): string {
  if (index <= 25) return 'danger';
  if (index <= 45) return 'warning';
  if (index <= 55) return 'medium';
  if (index <= 75) return 'success';
  return 'success';
}

const gainers = [...coins].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h).slice(0, 5);
const losers = [...coins].sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h).slice(0, 5);

const MarketOverview: React.FC = () => {
  const m = marketOverview;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start"><IonBackButton defaultHref="/home" /></IonButtons>
          <IonTitle>Market Overview</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <IonGrid style={{ padding: '12px 8px 0' }}>
          <IonRow>
            {[
              { label: 'Market Cap', value: fmt(m.totalMarketCapUsd), sub: `${m.marketCapChange24h > 0 ? '+' : ''}${m.marketCapChange24h}% 24h`, positive: m.marketCapChange24h >= 0 },
              { label: '24h Volume', value: fmt(m.totalVolume24hUsd), sub: 'Global', positive: true },
              { label: 'BTC Dom.', value: `${m.btcDominance}%`, sub: `ETH ${m.ethDominance}%`, positive: true },
              { label: 'Active', value: m.activeCryptos.toLocaleString(), sub: 'Cryptocurrencies', positive: true },
            ].map(stat => (
              <IonCol size="6" key={stat.label}>
                <IonCard style={{ margin: 4 }}>
                  <IonCardContent style={{ padding: '12px 14px' }}>
                    <p style={{ margin: 0, fontSize: 12, color: 'var(--ion-color-medium)' }}>{stat.label}</p>
                    <p style={{ margin: '4px 0 2px', fontWeight: 700, fontSize: 18 }}>{stat.value}</p>
                    <p style={{ margin: 0, fontSize: 12, color: stat.positive ? 'var(--ion-color-success)' : 'var(--ion-color-danger)' }}>{stat.sub}</p>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        <IonCard style={{ margin: '8px 16px' }}>
          <IonCardContent>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ margin: 0, fontSize: 13, color: 'var(--ion-color-medium)' }}>Fear & Greed Index</p>
                <p style={{ margin: '4px 0 0', fontWeight: 700, fontSize: 28 }}>{m.fearGreedIndex}</p>
              </div>
              <IonBadge color={fearColor(m.fearGreedIndex)} style={{ fontSize: 14, padding: '8px 14px' }}>
                {m.fearGreedLabel}
              </IonBadge>
            </div>
            <div style={{ marginTop: 12, height: 8, borderRadius: 4, background: 'linear-gradient(to right, #eb445a, #ffc409, #2dd36f)', position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: `${m.fearGreedIndex}%`,
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: 16,
                height: 16,
                borderRadius: '50%',
                background: 'white',
                border: '2px solid #333',
                boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
              }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4, fontSize: 11, color: 'var(--ion-color-medium)' }}>
              <span>Extreme Fear</span><span>Extreme Greed</span>
            </div>
          </IonCardContent>
        </IonCard>

        <p style={{ padding: '8px 16px 0', fontWeight: 600, fontSize: 16 }}>Top Gainers (24h)</p>
        <IonList inset>
          {gainers.map(coin => (
            <IonItem key={coin.id} routerLink={`/coin/${coin.id}`} detail={false} lines="full">
              <img src={coin.image} alt={coin.name} width={28} height={28} style={{ borderRadius: '50%', marginRight: 12 }} />
              <IonLabel>
                <h3 style={{ fontWeight: 600 }}>{coin.name}</h3>
                <p style={{ fontSize: 12 }}>{coin.symbol.toUpperCase()}</p>
              </IonLabel>
              <IonBadge slot="end" color="success">
                +{coin.price_change_percentage_24h.toFixed(2)}%
              </IonBadge>
            </IonItem>
          ))}
        </IonList>

        <p style={{ padding: '8px 16px 0', fontWeight: 600, fontSize: 16 }}>Top Losers (24h)</p>
        <IonList inset>
          {losers.map(coin => (
            <IonItem key={coin.id} routerLink={`/coin/${coin.id}`} detail={false} lines="full">
              <img src={coin.image} alt={coin.name} width={28} height={28} style={{ borderRadius: '50%', marginRight: 12 }} />
              <IonLabel>
                <h3 style={{ fontWeight: 600 }}>{coin.name}</h3>
                <p style={{ fontSize: 12 }}>{coin.symbol.toUpperCase()}</p>
              </IonLabel>
              <IonBadge slot="end" color="danger">
                {coin.price_change_percentage_24h.toFixed(2)}%
              </IonBadge>
            </IonItem>
          ))}
        </IonList>

      </IonContent>
    </IonPage>
  );
};

export default MarketOverview;
