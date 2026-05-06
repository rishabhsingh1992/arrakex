import { IonSearchbar } from '@ionic/react';

interface Props {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<Props> = ({ value, onChange, placeholder = 'Search coins…' }) => (
  <IonSearchbar
    value={value}
    onIonInput={e => onChange(e.detail.value ?? '')}
    placeholder={placeholder}
    debounce={0}
    animated
  />
);

export default SearchBar;
