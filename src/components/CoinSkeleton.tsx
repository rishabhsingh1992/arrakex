import { IonItem, IonLabel, IonSkeletonText, IonAvatar } from '@ionic/react';

const CoinSkeleton: React.FC = () => (
  <IonItem lines="full">
    <IonAvatar slot="start" style={{ width: 40, height: 40 }}>
      <IonSkeletonText animated />
    </IonAvatar>
    <IonLabel>
      <h2><IonSkeletonText animated style={{ width: '50%' }} /></h2>
      <p><IonSkeletonText animated style={{ width: '30%' }} /></p>
    </IonLabel>
    <div slot="end" style={{ width: 80 }}>
      <IonSkeletonText animated style={{ width: '100%', height: 16 }} />
      <IonSkeletonText animated style={{ width: '60%', height: 14, marginTop: 6 }} />
    </div>
  </IonItem>
);

export default CoinSkeleton;
