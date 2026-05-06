import { useState } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonList, IonRefresher, IonRefresherContent, IonSearchbar,
  IonCard, IonCardContent, IonBadge, IonButton, IonButtons, IonIcon,
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { statsChartOutline } from 'ionicons/icons';
import CoinCard from '../components/CoinCard';
import CoinSkeleton from '../components/CoinSkeleton';
import { useCoins } from '../hooks/useCoins';
import { marketOverview } from '../data/mockMarket';
import './Home.css';

function fmt(n: number): string {
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  return `$${(n / 1e6).toFixed(2)}M`;
}

const Home: React.FC = () => {
  const { data: coins, loading, refresh } = useCoins();
  const [query, setQuery] = useState('');
  const history = useHistory();

  const m = marketOverview;
  const isUp = m.marketCapChange24h >= 0;

  const gainers = [...coins].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h).slice(0, 3);
  const losers = [...coins].sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h).slice(0, 3);

  const filtered = query.trim()
    ? coins.filter(c => c.name.toLowerCase().includes(query.toLowerCase()) || c.symbol.toLowerCase().includes(query.toLowerCase()))
    : coins;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Arrakex</IonTitle>
          <IonButtons slot="end">
            <IonButton fill="clear" onClick={() => history.push('/market-overview')}>
              <IonIcon slot="icon-only" icon={statsChartOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Markets</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonRefresher slot="fixed" onIonRefresh={e => { refresh(); setTimeout(() => e.detail.complete(), 700); }}>
          <IonRefresherContent />
        </IonRefresher>

        {/* Market Overview Banner */}
        <IonCard style={{ margin: '12px 16px 8px', cursor: 'pointer' }} onClick={() => history.push('/market-overview')}>
          <IonCardContent style={{ padding: '12px 16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p style={{ margin: 0, fontSize: 12, color: 'var(--ion-color-medium)' }}>Total Market Cap</p>
                <p style={{ margin: '2px 0 0', fontWeight: 700, fontSize: 20 }}>{fmt(m.totalMarketCapUsd)}</p>
              </div>
              <IonBadge color={isUp ? 'success' : 'danger'} style={{ fontSize: 13 }}>
                {isUp ? '+' : ''}{m.marketCapChange24h}% 24h
              </IonBadge>
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 10, fontSize: 12, color: 'var(--ion-color-medium)' }}>
              <span>BTC Dom. <strong style={{ color: 'var(--ion-text-color)' }}>{m.btcDominance}%</strong></span>
              <span>Vol <strong style={{ color: 'var(--ion-text-color)' }}>{fmt(m.totalVolume24hUsd)}</strong></span>
              <span>F&G <strong style={{ color: 'var(--ion-text-color)' }}>{m.fearGreedIndex} {m.fearGreedLabel}</strong></span>
            </div>
          </IonCardContent>
        </IonCard>

        {/* Gainers & Losers */}
        {!loading && (
          <div style={{ padding: '4px 0 8px' }}>
            <div style={{ display: 'flex', gap: 8, padding: '0 16px', overflowX: 'auto', scrollbarWidth: 'none' }}>
              <div style={{ flexShrink: 0 }}>
                <p style={{ margin: '0 0 6px', fontSize: 12, fontWeight: 600, color: 'var(--ion-color-success)' }}>🔥 Gainers</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  {gainers.map(coin => (
                    <IonCard key={coin.id} style={{ margin: 0, minWidth: 110, cursor: 'pointer' }} onClick={() => history.push(`/coin/${coin.id}`)}>
                      <IonCardContent style={{ padding: '10px 12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                          <img src={coin.image} alt={coin.name} width={18} height={18} style={{ borderRadius: '50%' }} />
                          <span style={{ fontSize: 12, fontWeight: 600 }}>{coin.symbol.toUpperCase()}</span>
                        </div>
                        <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: 'var(--ion-color-success)' }}>
                          +{coin.price_change_percentage_24h.toFixed(2)}%
                        </p>
                      </IonCardContent>
                    </IonCard>
                  ))}
                </div>
              </div>
              <div style={{ flexShrink: 0, marginLeft: 8 }}>
                <p style={{ margin: '0 0 6px', fontSize: 12, fontWeight: 600, color: 'var(--ion-color-danger)' }}>📉 Losers</p>
                <div style={{ display: 'flex', gap: 8 }}>
                  {losers.map(coin => (
                    <IonCard key={coin.id} style={{ margin: 0, minWidth: 110, cursor: 'pointer' }} onClick={() => history.push(`/coin/${coin.id}`)}>
                      <IonCardContent style={{ padding: '10px 12px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                          <img src={coin.image} alt={coin.name} width={18} height={18} style={{ borderRadius: '50%' }} />
                          <span style={{ fontSize: 12, fontWeight: 600 }}>{coin.symbol.toUpperCase()}</span>
                        </div>
                        <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: 'var(--ion-color-danger)' }}>
                          {coin.price_change_percentage_24h.toFixed(2)}%
                        </p>
                      </IonCardContent>
                    </IonCard>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search */}
        <IonSearchbar
          value={query}
          onIonInput={e => setQuery(e.detail.value ?? '')}
          placeholder="Search coins…"
          animated
          style={{ padding: '0 8px 4px' }}
        />

        {/* Coin List */}
        <IonList>
          {loading
            ? Array.from({ length: 10 }, (_, i) => <CoinSkeleton key={i} />)
            : filtered.map(coin => <CoinCard key={coin.id} coin={coin} />)
          }
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
