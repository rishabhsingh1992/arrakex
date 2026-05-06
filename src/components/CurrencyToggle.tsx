import { IonSegment, IonSegmentButton, IonLabel } from '@ionic/react';
import { useCurrency } from '../hooks/useCurrency';

const CurrencyToggle: React.FC = () => {
  const { currency, setCurrency } = useCurrency();

  return (
    <IonSegment
      value={currency}
      onIonChange={e => setCurrency(e.detail.value as 'usd' | 'inr')}
      style={{ maxWidth: 160 }}
    >
      <IonSegmentButton value="usd">
        <IonLabel>USD</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="inr">
        <IonLabel>INR</IonLabel>
      </IonSegmentButton>
    </IonSegment>
  );
};

export default CurrencyToggle;
