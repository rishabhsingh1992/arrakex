import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonList, IonItem, IonLabel, IonToggle, IonSelect, IonSelectOption,
  IonListHeader, IonNote,
} from '@ionic/react';
import { useAppContext } from '../store/appStore';
import { useCurrency } from '../hooks/useCurrency';
import type { Currency } from '../store/appStore';

const Settings: React.FC = () => {
  const { darkMode, toggleDarkMode } = useAppContext();
  const { currency, setCurrency } = useCurrency();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Settings</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Settings</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList inset style={{ marginTop: 16 }}>
          <IonListHeader><IonLabel>Appearance</IonLabel></IonListHeader>
          <IonItem>
            <IonLabel>Dark Mode</IonLabel>
            <IonToggle
              slot="end"
              checked={darkMode}
              onIonChange={toggleDarkMode}
            />
          </IonItem>
        </IonList>

        <IonList inset>
          <IonListHeader><IonLabel>Display</IonLabel></IonListHeader>
          <IonItem>
            <IonLabel>Currency</IonLabel>
            <IonSelect
              value={currency}
              onIonChange={e => setCurrency(e.detail.value as Currency)}
              interface="popover"
            >
              <IonSelectOption value="usd">USD ($)</IonSelectOption>
              <IonSelectOption value="inr">INR (₹)</IonSelectOption>
            </IonSelect>
          </IonItem>
        </IonList>

        <IonList inset>
          <IonListHeader><IonLabel>About</IonLabel></IonListHeader>
          <IonItem>
            <IonLabel>App</IonLabel>
            <IonNote slot="end">Arrakex</IonNote>
          </IonItem>
          <IonItem>
            <IonLabel>Version</IonLabel>
            <IonNote slot="end">0.0.1</IonNote>
          </IonItem>
          <IonItem lines="none">
            <IonLabel>Data</IonLabel>
            <IonNote slot="end">Mock data</IonNote>
          </IonItem>
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Settings;
