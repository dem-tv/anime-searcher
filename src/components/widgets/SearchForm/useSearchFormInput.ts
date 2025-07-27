import { useState } from 'react';
import { LS } from '../../../utils/localStorage.ts';

export function useSearchFormInput() {
  const [search, setSearch] = useState(LS.get('search') || '');

  function onChangeSearch(typedValue: string) {
    LS.set('search', typedValue);

    setSearch(typedValue);
  }

  return { search, setSearch: onChangeSearch };
}
