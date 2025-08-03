import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  cleanup,
  fireEvent,
  getByLabelText,
  getByTestId,
  getByText,
  queryByRole,
  screen,
  queryByText,
} from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Main from './Main.tsx';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { API_HOST } from '../../api/constants.ts';
import { animeListMockResponse } from '../../__mocks__/animeList.ts';
import { errorMockResponse } from '../../__mocks__/errorResponse.ts';
import { getElementWithRouter } from '../../__test-utils__/renderWithRouter.tsx';
import { MemoryRouter, Route, Routes } from 'react-router';
import { renderWithProviders } from '../../__test-utils__/renderWithProviders.tsx';
import { ThemeProvider } from '../../components/ui/Theme/ThemeProvider.tsx';

const successHandlers = [
  http.post(API_HOST, () => {
    return HttpResponse.json(animeListMockResponse);
  }),
];

const errorHandlers = [
  http.post(API_HOST, () => {
    return HttpResponse.json(errorMockResponse);
  }),
];

const successServer = setupServer(...successHandlers);
const errorServer = setupServer(...errorHandlers);

function renderDefault(url?: string) {
  return renderWithProviders(
    getElementWithRouter(
      <ThemeProvider>
        <Main />
      </ThemeProvider>,
      url
    )
  );
}

function renderWithMemoryRoute(path: string) {
  return renderWithProviders(
    <ThemeProvider>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path={'/'} element={<Main />}>
            <Route path={':animeId'} element="child"></Route>
          </Route>
        </Routes>
      </MemoryRouter>
    </ThemeProvider>
  );
}

describe('Main', () => {
  beforeEach(() => {
    cleanup();
  });

  it('Renders Main', () => {
    const container = renderDefault().container;

    expect(container).toBeInTheDocument();
  });

  it('Renders loader search', async () => {
    successServer.listen();
    const container = renderDefault().container;

    const buttonSearch = getByText(container, 'Explore anime!');
    const inputSearch = getByLabelText(container, 'Search');

    fireEvent.input(inputSearch, {
      target: { value: 'naruto' },
    });
    fireEvent.click(buttonSearch);

    const animeList = getByTestId(container, 'page-loader');

    expect(animeList).toBeInTheDocument();
    successServer.close();
  });

  it('Renders list of anime on search', async () => {
    successServer.listen();
    const container = renderDefault().container;

    const buttonSearch = getByText(container, 'Explore anime!');
    const inputSearch = getByLabelText(container, 'Search');

    fireEvent.input(inputSearch, {
      target: { value: 'naruto' },
    });
    fireEvent.click(buttonSearch);

    const animeList = await vi.waitFor(() => {
      const list = queryByRole(container, 'list');
      expect(list).toBeTruthy();
      return list;
    });

    expect(animeList).toBeInTheDocument();
    successServer.close();
  });

  it('Doesnt render list of anime on first render when search isn`t set in localStorage', () => {
    localStorage.removeItem('search');

    const container = renderDefault().container;

    const placeholder = getByText(container, 'No results :(');

    expect(placeholder).toBeInTheDocument();
  });

  it('Renders list of anime on first render when search is set in localStorage', async () => {
    successServer.listen();
    localStorage.setItem('search', JSON.stringify('naruto'));

    const container = renderDefault().container;

    const animeList = await vi.waitFor(() => {
      const list = queryByRole(container, 'list');
      expect(list).toBeTruthy();
      return list;
    });

    expect(animeList).toBeInTheDocument();
    successServer.close();
  });

  it('Renders error text on error', async () => {
    errorServer.listen();

    const container = renderDefault().container;

    const buttonSearch = getByText(container, 'Explore anime!');
    const inputSearch = getByLabelText(container, 'Search');

    fireEvent.input(inputSearch, {
      target: { value: 'naruto' },
    });
    fireEvent.click(buttonSearch);

    const errorText = await vi.waitFor(() => {
      const errorText = queryByText(container, 'Error get response');
      expect(errorText).toBeTruthy();
      return errorText;
    });

    expect(errorText).toBeInTheDocument();
    errorServer.close();
  });

  it('Renders back link when details is opened', async () => {
    successServer.listen();

    renderWithMemoryRoute('/:aimeId');

    const back = screen.getByLabelText('Collapse');

    expect(back).toBeInTheDocument();
    successServer.close();
  });

  it('Does`nt render back link when details is closed', async () => {
    successServer.listen();

    renderWithMemoryRoute('/');

    const back = screen.queryByLabelText('Collapse');

    expect(back).not.toBeInTheDocument();
    successServer.close();
  });

  it('Shows current page', async () => {
    successServer.listen();
    localStorage.setItem('search', JSON.stringify('naruto'));

    renderDefault('/?page=2');

    const currentPage = await vi.waitFor(() => {
      const currentPage = screen.getByText('Current page: 2');
      expect(currentPage).toBeTruthy();
      return currentPage;
    });

    expect(currentPage).toBeInTheDocument();
    successServer.close();
  });
});

describe('Main.tsx - selection', () => {
  it('Clicking on checkboxes selects and shows count', async () => {
    successServer.listen();
    localStorage.setItem('search', JSON.stringify('naruto'));

    renderDefault();

    await vi.waitFor(() => {
      const list = screen.queryByRole('list');
      expect(list).toBeTruthy();
    });

    screen
      .getAllByRole('checkbox')
      .slice(0, 5)
      .forEach((checkbox) => {
        fireEvent.click(checkbox);
      });

    const selectText = screen.getByText('Selected cards: 5');

    expect(selectText).toBeInTheDocument();
  });

  it('After selection ang page changing shows selected cards', async () => {
    fireEvent.click(screen.getByText('Next'));

    const selectText = screen.getByText('Selected cards: 5');

    expect(selectText).toBeInTheDocument();
    successServer.close();
  });

  it('Adds link for download when items selected', async () => {
    const downloadBtn = screen.getByRole('link', { name: 'Download' });

    expect(downloadBtn).toHaveAttribute('href', 'mock-object-url');
    expect(downloadBtn).toHaveAttribute('download', '5_items.csv');
  });

  it('Clicking on "Unselect all" unselects all cards', async () => {
    const unselectBtn = screen.getByRole('button', { name: 'Unselect all' });
    fireEvent.click(unselectBtn);

    const selectText = screen.queryByText('Selected cards: 5');

    expect(selectText).not.toBeInTheDocument();
    successServer.close();
  });
});
