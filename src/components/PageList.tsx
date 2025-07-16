import React from 'react';
import type { Pagination } from '../api/types/anime.types.ts';
import { PageLoader } from './PageLoader.tsx';

type Props<ListItem> = {
  pagination: Pagination | null;
  list: ListItem[];
  renderItem: (item: ListItem) => React.ReactNode;
  loading: boolean;
  itemKey: keyof ListItem;
};

export class PageList<ListItem> extends React.Component<Props<ListItem>> {
  render() {
    if (this.props.loading) {
      return <PageLoader />;
    }

    if (!this.props.list.length) {
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
      <div className={'flex h-full flex-wrap gap-8 items-center flex-col'}>
        {this.props.list.map((item) => (
          <div key={item[this.props.itemKey] as string} className={'max-w-7xl'}>
            {this.props.renderItem(item)}
          </div>
        ))}
        {this.props.pagination && (
          <p>Total items: {this.props.pagination.total}</p>
        )}
      </div>
    );
  }
}
