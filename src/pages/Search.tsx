import { useState } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonList,
} from '@ionic/react';
import SearchBar from '../components/SearchBar';
import CoinCard from '../components/CoinCard';
import { useCoins } from '../hooks/useCoins';
import { useDebounce } from '../hooks/useDebounce';

const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const debounced = useDebounce(query, 400);
  const { data: coins } = useCoins();

  const results = debounced.trim().length === 0
    ? []
    : coins.filter(c =>
        c.name.toLowerCase().includes(debounced.toLowerCase()) ||
        c.symbol.toLowerCase().includes(debounced.toLowerCase())
      );

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Search</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Search</IonTitle>
          </IonToolbar>
        </IonHeader>

        <SearchBar value={query} onChange={setQuery} />

        {debounced.trim().length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🔍</div>
            <p style={{ color: 'var(--ion-color-medium)' }}>Search for a cryptocurrency by name or symbol.</p>
          </div>
        ) : results.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>😕</div>
            <h2 style={{ fontWeight: 600, marginBottom: 8 }}>No results</h2>
            <p style={{ color: 'var(--ion-color-medium)' }}>
              No coins match &ldquo;{debounced}&rdquo;.
            </p>
          </div>
        ) : (
          <IonList>
            {results.map(coin => <CoinCard key={coin.id} coin={coin} />)}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Search;
