import { useState, useEffect } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton,
  IonIcon, IonLabel, setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { trendingUp, briefcase, star, newspaper, settings } from 'ionicons/icons';

import Home from './pages/Home';
import CoinDetail from './pages/CoinDetail';
import Portfolio from './pages/Portfolio';
import Watchlist from './pages/Watchlist';
import News from './pages/News';
import Settings from './pages/Settings';
import MarketOverview from './pages/MarketOverview';
import Transactions from './pages/Transactions';

import { AppContext } from './store/appStore';
import type { Currency } from './store/appStore';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.class.css';
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const [currency, setCurrency] = useState<Currency>('usd');
  const [darkMode, setDarkMode] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);

  useEffect(() => {
    document.documentElement.classList.toggle('ion-palette-dark', darkMode);
  }, [darkMode]);

  function toggleDarkMode() {
    setDarkMode(prev => !prev);
  }

  return (
    <AppContext.Provider value={{ currency, setCurrency, darkMode, toggleDarkMode }}>
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/home" component={Home} />
              <Route exact path="/coin/:id" component={CoinDetail} />
              <Route exact path="/portfolio" component={Portfolio} />
              <Route exact path="/watchlist" component={Watchlist} />
              <Route exact path="/news" component={News} />
              <Route exact path="/settings" component={Settings} />
              <Route exact path="/market-overview" component={MarketOverview} />
              <Route exact path="/transactions" component={Transactions} />
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                <IonIcon icon={trendingUp} />
                <IonLabel>Markets</IonLabel>
              </IonTabButton>
              <IonTabButton tab="news" href="/news">
                <IonIcon icon={newspaper} />
                <IonLabel>News</IonLabel>
              </IonTabButton>
              <IonTabButton tab="portfolio" href="/portfolio">
                <IonIcon icon={briefcase} />
                <IonLabel>Portfolio</IonLabel>
              </IonTabButton>
              <IonTabButton tab="watchlist" href="/watchlist">
                <IonIcon icon={star} />
                <IonLabel>Watchlist</IonLabel>
              </IonTabButton>
              <IonTabButton tab="settings" href="/settings">
                <IonIcon icon={settings} />
                <IonLabel>Settings</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    </AppContext.Provider>
  );
};

export default App;
