import { describe, expect, it, vi } from 'vitest';
import { fireEvent, screen, render, getByText } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { SearchForm } from './SearchForm.tsx';

const props = {
  onSubmit: () => {},
};

describe('SearchForm', () => {
  it('Renders SearchForm', () => {
    const input = render(<SearchForm {...props} />).container;

    expect(input).toBeInTheDocument();
  });

  it('Calls onSearch on submitting the form', () => {
    const spy = vi.spyOn(props, 'onSubmit');

    const container = render(<SearchForm {...props} />).container;

    const button = getByText(container, 'Explore anime!') as HTMLButtonElement;

    fireEvent.click(button);

    expect(spy).toHaveBeenCalled();
  });

  it('Set search value to LocaleStorage when typing', () => {
    const spy = vi.spyOn(Storage.prototype, 'setItem');
    render(<SearchForm {...props} />);

    const input = screen.getByLabelText('Search') as HTMLButtonElement;

    fireEvent.change(input, {
      target: { value: 'naruto' },
    });

    expect(spy).toHaveBeenCalled();
  });

  it('Gets search value from LocaleStorage when firstly render component', () => {
    render(<SearchForm {...props} />);

    const input = screen.getByLabelText('Search') as HTMLButtonElement;

    expect(input.value).toBe('naruto');
  });
});
