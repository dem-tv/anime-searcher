import { describe, expect, it, vi } from 'vitest';
import { fireEvent, screen, render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { SearchForm } from './SearchForm.tsx';

const props = {
  onSubmit: () => {},
};

describe('SearchForm', () => {
  const container = render(<SearchForm {...props} />).container;

  it('Renders SearchForm', () => {
    expect(container).toBeInTheDocument();
  });

  it('Set search value to LocaleStorage when typing', () => {
    const spy = vi.spyOn(Storage.prototype, 'setItem');

    const input = screen.getByLabelText('Search') as HTMLButtonElement;

    fireEvent.change(input, {
      target: { value: 'naruto' },
    });

    expect(spy).toHaveBeenCalled();
  });

  it('Gets search value from LocaleStorage when firstly render component', () => {
    const input = screen.getByLabelText('Search') as HTMLButtonElement;

    expect(input.value).toBe('naruto');
  });
});
