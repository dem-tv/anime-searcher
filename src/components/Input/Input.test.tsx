import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Input } from './Input.tsx';
import '@testing-library/jest-dom/vitest';

describe('Input', () => {
  it('Renders Input', () => {
    render(<Input value={'inputValue'} setValue={() => {}} />);

    expect(screen.getByDisplayValue('inputValue')).toBeInTheDocument();
  });
});
