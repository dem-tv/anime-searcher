import React, { useEffect, useState } from 'react';
import { Input } from '../Input/Input.tsx';
import { Button } from '../Button/Button.tsx';
import { LS } from '../../utils/localStorage.ts';

type Props = {
  onSubmit: (search: string) => void;
};

export function SearchForm(props: Props) {
  const [search, setSearch] = useState('');

  useEffect(() => {
    const searchSaved = LS.get('search') || '';

    setSearch(searchSaved);

    if (searchSaved) {
      props.onSubmit(searchSaved);
    }
  }, []);

  function onSearchChange(typedValue: string) {
    LS.set('search', typedValue);

    setSearch(typedValue);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();

    props.onSubmit(search);
  }

  return (
    <form className={'flex gap-4 flex-wrap justify-center'} onSubmit={onSubmit}>
      <Input
        name={'search'}
        label={'Search'}
        value={search}
        setValue={onSearchChange}
      />
      <Button type="submit">Explore anime!</Button>
    </form>
  );
}
