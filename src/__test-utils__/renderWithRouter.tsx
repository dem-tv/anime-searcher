import type { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter, MemoryRouter, Route, Routes } from 'react-router';

export function renderWithRouter(
  ui: ReactNode,
  url: string | null = '',
  path: string = ''
) {
  if (url) {
    return render(
      <MemoryRouter initialEntries={[url]}>
        <Routes>
          <Route path={path} element={ui} />
        </Routes>
      </MemoryRouter>
    );
  }

  return render(ui, { wrapper: BrowserRouter });
}
