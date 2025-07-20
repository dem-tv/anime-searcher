import { describe, expect, it, vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { ErrorBoundary } from './ErrorBoundary.tsx';
import { type ReactNode } from 'react';

describe('ErrorBoundary', () => {
  it('Renders component', () => {
    const component = render(<ErrorBoundary>children</ErrorBoundary>).container;

    expect(component).toBeInTheDocument();
  });

  it('Renders children', () => {
    const children = 'text';

    render(<ErrorBoundary>{children}</ErrorBoundary>);

    const childrenNode = screen.getByText(children);
    expect(childrenNode).toBeInTheDocument();
  });

  it('Shows fallback on error', () => {
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const children = {} as ReactNode;
    const errorText = 'Oooops! Something went wrong! Try to reload the page.';

    render(<ErrorBoundary>{children}</ErrorBoundary>);

    const errorNode = screen.getByText(errorText);

    expect(errorNode).toBeInTheDocument();
  });
});
