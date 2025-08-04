import type { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router';

export function getElementWithRouter(
  ui: ReactNode,
  url: string | null = '',
  path: string = ''
) {
  if (url) {
    return (
      <MemoryRouter initialEntries={[url]}>
        <Routes>
          <Route path={path} element={ui} />
        </Routes>
      </MemoryRouter>
    );
  }

  return <BrowserRouter>{ui}</BrowserRouter>;
}

export function renderWithRouter(
  ui: ReactNode,
  url: string | null = '',
  path: string = ''
) {
  return render(getElementWithRouter(ui, url, path));
}
