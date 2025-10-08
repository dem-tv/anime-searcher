import React, { useEffect } from 'react';
import { Input } from '../../ui/Input/Input.tsx';
import { Button } from '../../ui/Button/Button.tsx';
import { useSearchFormInput } from './useSearchFormInput.ts';

type Props = {
  onSubmit: (search: string) => void;
};

export function SearchForm(props: Props) {
  const { search, setSearch } = useSearchFormInput();

  useEffect(() => {
    if (search) {
      props.onSubmit(search);
    }
  }, []);

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
        setValue={setSearch}
      />
      <Button type="submit">Explore anime!</Button>
    </form>
  );
}
