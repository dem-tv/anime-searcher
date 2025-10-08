import { describe, expect, it, vi } from 'vitest';
import { fireEvent, getByDisplayValue, render } from '@testing-library/react';
import { Input } from './Input.tsx';
import '@testing-library/jest-dom/vitest';

const props = {
  setValue: () => {},
  label: 'input',
  name: 'input',
  value: 'inputValue',
};

describe('Input', () => {
  const container = render(<Input {...props} />).container as HTMLInputElement;

  it('Renders Input', () => {
    const input = render(<Input {...props} />).container;

    expect(input).toBeInTheDocument();
  });

  it('Pass prop value to the input', () => {
    const input = getByDisplayValue(
      container,
      'inputValue'
    ) as HTMLInputElement;

    expect(input.value).toBe('inputValue');
  });

  it('Calls setValue on typing', () => {
    const spy = vi.spyOn(props, 'setValue');

    const container = render(<Input {...props} />)
      .container as HTMLInputElement;
    const input = getByDisplayValue(
      container,
      'inputValue'
    ) as HTMLInputElement;

    fireEvent.change(input, {
      target: { value: 'text' },
    });

    expect(spy).toHaveBeenCalledWith('text');
  });
});
