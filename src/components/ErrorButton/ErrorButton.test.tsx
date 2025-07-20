import { describe, expect, it } from 'vitest';
import { getByText, render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { ErrorButton } from './ErrorButton.tsx';

describe('ErrorButton', () => {
  const container = render(<ErrorButton />).container;
  const button = getByText(container, 'Explode!');

  it('Renders ErrorBoundary', () => {
    expect(button).toBeInTheDocument();
  });
});
