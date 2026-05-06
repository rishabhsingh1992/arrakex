import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList,
} from '@ionic/react';
import CoinCard from '../components/CoinCard';
import { useWatchlist } from '../hooks/useWatchlist';
import { useCoins } from '../hooks/useCoins';

const Watchlist: React.FC = () => {
  const { watched } = useWatchlist();
  const { data: coins } = useCoins();

  const watchedCoins = coins.filter(c => watched.includes(c.id));

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Watchlist</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Watchlist</IonTitle>
          </IonToolbar>
        </IonHeader>

        {watchedCoins.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>⭐</div>
            <h2 style={{ fontWeight: 600, marginBottom: 8 }}>No coins yet</h2>
            <p style={{ color: 'var(--ion-color-medium)' }}>
              Tap the star on any coin to add it here.
            </p>
          </div>
        ) : (
          <IonList>
            {watchedCoins.map(coin => (
              <CoinCard key={coin.id} coin={coin} />
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Watchlist;
