import { describe, expect, it } from 'vitest';
import { fireEvent, getByText, render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { ErrorButton } from './ErrorButton.tsx';

describe('ErrorButton', () => {
  const container = render(<ErrorButton />).container;
  const button = getByText(container, 'Explode!');

  it('Renders ErrorBoundary', () => {
    expect(button).toBeInTheDocument();
  });

  it('Click on button throws an error', () => {
    let error = null;

    try {
      fireEvent.click(button);
    } catch (e) {
      error = e;
    }

    expect(error).toBeTruthy();
  });
});
