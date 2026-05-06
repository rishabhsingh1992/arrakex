import { useState } from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton,
  IonIcon, IonLabel, setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { trendingUp, briefcase, search } from 'ionicons/icons';

import Home from './pages/Home';
import CoinDetail from './pages/CoinDetail';
import Portfolio from './pages/Portfolio';
import Search from './pages/Search';

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
import '@ionic/react/css/palettes/dark.system.css';
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => {
  const [currency, setCurrency] = useState<Currency>('usd');

  return (
    <AppContext.Provider value={{ currency, setCurrency }}>
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            <IonRouterOutlet>
              <Route exact path="/home" component={Home} />
              <Route exact path="/coin/:id" component={CoinDetail} />
              <Route exact path="/portfolio" component={Portfolio} />
              <Route exact path="/search" component={Search} />
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
            </IonRouterOutlet>

            <IonTabBar slot="bottom">
              <IonTabButton tab="home" href="/home">
                <IonIcon icon={trendingUp} />
                <IonLabel>Markets</IonLabel>
              </IonTabButton>
              <IonTabButton tab="search" href="/search">
                <IonIcon icon={search} />
                <IonLabel>Search</IonLabel>
              </IonTabButton>
              <IonTabButton tab="portfolio" href="/portfolio">
                <IonIcon icon={briefcase} />
                <IonLabel>Portfolio</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    </AppContext.Provider>
  );
};

export default App;
