import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonList, IonRefresher, IonRefresherContent, IonButtons, IonButton, IonIcon,
} from '@ionic/react';
import { sunny, moon } from 'ionicons/icons';
import CoinCard from '../components/CoinCard';
import CoinSkeleton from '../components/CoinSkeleton';
import CurrencyToggle from '../components/CurrencyToggle';
import { useCoins } from '../hooks/useCoins';
import { useAppContext } from '../store/appStore';
import './Home.css';

const Home: React.FC = () => {
  const { data, loading, refresh } = useCoins();
  const { darkMode, toggleDarkMode } = useAppContext();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonButton onClick={toggleDarkMode} fill="clear">
              <IonIcon slot="icon-only" icon={darkMode ? sunny : moon} />
            </IonButton>
          </IonButtons>
          <IonTitle>Arrakex</IonTitle>
          <IonButtons slot="end" style={{ paddingRight: 8 }}>
            <CurrencyToggle />
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

        <IonList>
          {loading
            ? Array.from({ length: 10 }, (_, i) => <CoinSkeleton key={i} />)
            : data.map(coin => <CoinCard key={coin.id} coin={coin} />)
          }
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Home;
