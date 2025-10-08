import { describe, expect, it, vi } from 'vitest';
import {
  render,
  getByRole,
  getByText,
  getByTestId,
} from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { PageList } from './PageList.tsx';

type ListItem = {
  text: string;
};

const props = {
  pagination: 'pagination component',
  list: [
    {
      text: 'text1',
    },
    {
      text: 'text2',
    },
    {
      text: 'text3',
    },
    {
      text: 'text4',
    },
  ],
  renderItem: (item: ListItem) => item.text,
  loading: false,
  itemKey: 'text' as const,
};

describe('PageList', () => {
  it('Renders PageList', () => {
    const container = render(<PageList {...props} />).container;

    expect(container).toBeInTheDocument();
  });

  it('Renders list of passed items', () => {
    const spy = vi.spyOn(props, 'renderItem');
    const container = render(<PageList {...props} />).container;
    const list = getByRole(container, 'list');

    expect(list.children.length).toBe(4);
    expect(spy).toBeCalledTimes(4);
  });

  it('Renders placeholder block when items list is empty', () => {
    const container = render(<PageList {...props} list={[]} />).container;

    const placeholder = getByText(container, 'No results :(') as HTMLElement;

    expect(placeholder).toBeInTheDocument();
  });

  it('Renders loader when passed prop loading', () => {
    const container = render(<PageList {...props} loading />).container;

    const loader = getByTestId(container, 'page-loader') as HTMLButtonElement;

    expect(loader).toBeInTheDocument();
  });
});
