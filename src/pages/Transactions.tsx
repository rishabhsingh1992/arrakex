import { useState } from 'react';
import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonBackButton, IonButtons, IonButton, IonIcon,
  IonList, IonItem, IonLabel, IonBadge, IonAvatar,
  IonModal, IonSelect, IonSelectOption, IonInput,
  IonToast, IonItemSliding, IonItemOptions, IonItemOption,
} from '@ionic/react';
import { addOutline } from 'ionicons/icons';
import { useTransactions } from '../hooks/useTransactions';
import { useCurrency } from '../hooks/useCurrency';
import coins from '../data/mockCoins';

const Transactions: React.FC = () => {
  const { transactions, add, remove } = useTransactions();
  const { formatPrice } = useCurrency();

  const [showModal, setShowModal] = useState(false);
  const [coinId, setCoinId] = useState('bitcoin');
  const [type, setType] = useState<'buy' | 'sell'>('buy');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [toast, setToast] = useState('');

  function submit() {
    const qty = parseFloat(quantity);
    const prc = parseFloat(price);
    if (!coinId || isNaN(qty) || qty <= 0 || isNaN(prc) || prc <= 0) return;
    add({ coinId, type, quantity: qty, priceUsd: prc, date: new Date().toISOString() });
    setQuantity('');
    setPrice('');
    setShowModal(false);
    setToast(`${type === 'buy' ? 'Buy' : 'Sell'} recorded`);
  }

  function totalCost(coinId: string) {
    return transactions
      .filter(t => t.coinId === coinId)
      .reduce((sum, t) => sum + (t.type === 'buy' ? 1 : -1) * t.quantity * t.priceUsd, 0);
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start"><IonBackButton defaultHref="/portfolio" /></IonButtons>
          <IonTitle>Transactions</IonTitle>
          <IonButtons slot="end">
            <IonButton fill="clear" onClick={() => setShowModal(true)}>
              <IonIcon slot="icon-only" icon={addOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {transactions.length === 0 ? (
          <div style={{ padding: 48, textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>📋</div>
            <h2 style={{ fontWeight: 600, marginBottom: 8 }}>No transactions yet</h2>
            <p style={{ color: 'var(--ion-color-medium)' }}>Tap + to log your first buy or sell.</p>
          </div>
        ) : (
          <IonList>
            {transactions.map(tx => {
              const coin = coins.find(c => c.id === tx.coinId);
              if (!coin) return null;
              const value = tx.quantity * tx.priceUsd;
              const currentValue = tx.quantity * coin.current_price_usd;
              const pnl = tx.type === 'buy' ? currentValue - value : value - currentValue;
              const pnlPct = ((pnl / value) * 100).toFixed(2);
              return (
                <IonItemSliding key={tx.id}>
                  <IonItem lines="full">
                    <IonAvatar slot="start" style={{ width: 36, height: 36 }}>
                      <img src={coin.image} alt={coin.name} />
                    </IonAvatar>
                    <IonLabel>
                      <h3 style={{ fontWeight: 600 }}>
                        <IonBadge color={tx.type === 'buy' ? 'success' : 'danger'} style={{ marginRight: 6, fontSize: 10 }}>
                          {tx.type.toUpperCase()}
                        </IonBadge>
                        {coin.name}
                      </h3>
                      <p style={{ fontSize: 12 }}>
                        {tx.quantity} {coin.symbol.toUpperCase()} @ {formatPrice(tx.priceUsd, tx.priceUsd * 83.3)}
                      </p>
                      <p style={{ fontSize: 11, color: 'var(--ion-color-medium)' }}>
                        {new Date(tx.date).toLocaleDateString()}
                      </p>
                    </IonLabel>
                    <div slot="end" style={{ textAlign: 'right' }}>
                      <p style={{ margin: 0, fontWeight: 600, fontSize: 14 }}>
                        {formatPrice(value, value * 83.3)}
                      </p>
                      <p style={{ margin: '2px 0 0', fontSize: 12, color: pnl >= 0 ? 'var(--ion-color-success)' : 'var(--ion-color-danger)' }}>
                        {pnl >= 0 ? '+' : ''}{pnlPct}% P&L
                      </p>
                    </div>
                  </IonItem>
                  <IonItemOptions side="end">
                    <IonItemOption color="danger" onClick={() => { remove(tx.id); setToast('Transaction deleted'); }}>
                      Delete
                    </IonItemOption>
                  </IonItemOptions>
                </IonItemSliding>
              );
            })}
          </IonList>
        )}

        <IonModal isOpen={showModal} onDidDismiss={() => setShowModal(false)} initialBreakpoint={0.6} breakpoints={[0, 0.6]}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Add Transaction</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => setShowModal(false)}>Cancel</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList style={{ padding: '8px 0' }}>
              <IonItem>
                <IonLabel>Coin</IonLabel>
                <IonSelect value={coinId} onIonChange={e => setCoinId(e.detail.value)} interface="popover">
                  {coins.map(c => (
                    <IonSelectOption key={c.id} value={c.id}>{c.name} ({c.symbol.toUpperCase()})</IonSelectOption>
                  ))}
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonLabel>Type</IonLabel>
                <IonSelect value={type} onIonChange={e => setType(e.detail.value)} interface="popover">
                  <IonSelectOption value="buy">Buy</IonSelectOption>
                  <IonSelectOption value="sell">Sell</IonSelectOption>
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Quantity</IonLabel>
                <IonInput type="number" placeholder="0.00" value={quantity} onIonInput={e => setQuantity(String(e.detail.value ?? ''))} min={0} />
              </IonItem>
              <IonItem>
                <IonLabel position="stacked">Price per coin (USD)</IonLabel>
                <IonInput type="number" placeholder="0.00" value={price} onIonInput={e => setPrice(String(e.detail.value ?? ''))} min={0} />
              </IonItem>
              <IonItem lines="none" style={{ marginTop: 8 }}>
                <IonButton expand="block" onClick={submit} style={{ width: '100%' }}>
                  Save Transaction
                </IonButton>
              </IonItem>
            </IonList>
          </IonContent>
        </IonModal>

        <IonToast isOpen={!!toast} message={toast} duration={2000} onDidDismiss={() => setToast('')} position="bottom" />
      </IonContent>
    </IonPage>
  );
};

export default Transactions;
