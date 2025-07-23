import type { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router';

export function renderWithRouter(ui: ReactNode, url: string | URL | null = '') {
  window.history.pushState({}, 'Test page', url);

  return {
    ...render(ui, { wrapper: BrowserRouter }),
  };
}
