import React, { useCallback } from 'react';
import type { Pagination } from '../../api/types/anime.types.ts';
import { PageLoader } from '../PageLoader/PageLoader.tsx';

type Props<ListItem> = {
  pagination: Pagination | null;
  list: ListItem[];
  renderItem: (item: ListItem) => React.ReactNode;
  loading: boolean;
  itemKey: keyof ListItem;
};

export function PageList<ListItem>(props: Props<ListItem>) {
  const renderItem = useCallback(
    (item: ListItem) => {
      return (
        <li key={item[props.itemKey] as string} className={'max-w-7xl'}>
          {props.renderItem(item)}
        </li>
      );
    },
    [props.list, props.renderItem]
  );

  if (props.loading) {
    return <PageLoader />;
  }

  if (!props.list.length) {
    return (
      <div
        className={
          'max-w-7xl bg-neutral-300 m-auto flex flex-col gap-4 min-h-72 rounded-md items-center justify-center'
        }
      >
        <p>No results :(</p>
        <p>Try to change search query</p>
      </div>
    );
  }

  return (
    <>
      <ul className={'flex h-full flex-wrap gap-8 items-center flex-col'}>
        {props.list.map(renderItem)}
      </ul>
      {props.pagination && <p>Total items: {props.pagination.total}</p>}
    </>
  );
}
