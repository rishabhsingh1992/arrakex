import { useState } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonCard, IonCardContent, IonBadge, IonChip, IonLabel,
  IonButtons, IonButton, IonIcon,
} from '@ionic/react';
import { funnelOutline } from 'ionicons/icons';
import news from '../data/mockNews';
import coins from '../data/mockCoins';

const allCoins = [{ id: 'all', name: 'All' }, ...coins.map(c => ({ id: c.id, name: c.symbol.toUpperCase() }))];

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const h = Math.floor(diff / 3.6e6);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

const News: React.FC = () => {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all'
    ? news
    : news.filter(n => n.coins.includes(filter));

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>News</IonTitle>
          <IonButtons slot="end">
            <IonButton fill="clear">
              <IonIcon slot="icon-only" icon={funnelOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">News</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div style={{ display: 'flex', gap: 8, padding: '12px 16px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {allCoins.map(c => (
            <IonChip
              key={c.id}
              color={filter === c.id ? 'primary' : undefined}
              outline={filter !== c.id}
              onClick={() => setFilter(c.id)}
              style={{ flexShrink: 0 }}
            >
              <IonLabel>{c.name}</IonLabel>
            </IonChip>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📰</div>
            <p style={{ color: 'var(--ion-color-medium)' }}>No news for this coin yet.</p>
          </div>
        ) : (
          filtered.map(article => (
            <IonCard key={article.id} style={{ margin: '0 16px 12px' }}>
              <IonCardContent>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: 'var(--ion-color-medium)', fontWeight: 500 }}>{article.source}</span>
                  <span style={{ fontSize: 12, color: 'var(--ion-color-medium)' }}>{timeAgo(article.date)}</span>
                </div>
                <h2 style={{ fontWeight: 700, fontSize: 15, margin: '0 0 6px', lineHeight: 1.4 }}>{article.title}</h2>
                <p style={{ fontSize: 13, color: 'var(--ion-color-medium)', margin: '0 0 10px', lineHeight: 1.5 }}>{article.summary}</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {article.coins.map(coinId => {
                    const coin = coins.find(c => c.id === coinId);
                    return coin ? (
                      <IonBadge key={coinId} color="light" style={{ color: 'var(--ion-color-dark)', fontWeight: 500 }}>
                        {coin.symbol.toUpperCase()}
                      </IonBadge>
                    ) : null;
                  })}
                </div>
              </IonCardContent>
            </IonCard>
          ))
        )}
      </IonContent>
    </IonPage>
  );
};

export default News;
