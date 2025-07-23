import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  cleanup,
  fireEvent,
  getByLabelText,
  getByTestId,
  getByText,
  queryByRole,
  queryByText,
} from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import Main from './Main.tsx';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { API_HOST } from '../../api/constants.ts';
import { animeListMockResponse } from '../../__mocks__/animeList.ts';
import { errorMockResponse } from '../../__mocks__/error.ts';
import { renderWithRouter } from '../../__test-utils__/renderWithRouter.tsx';

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

describe('Main', () => {
  beforeEach(() => {
    cleanup();
  });

  it('Renders Main', () => {
    const container = renderWithRouter(<Main />).container;
    expect(container).toBeInTheDocument();
  });

  it('Renders loader search', async () => {
    successServer.listen();
    const container = renderWithRouter(<Main />).container;

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
    const container = renderWithRouter(<Main />).container;
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

    const container = renderWithRouter(<Main />).container;
    const placeholder = getByText(container, 'No results :(');

    expect(placeholder).toBeInTheDocument();
  });

  it('Renders list of anime on first render when search is set in localStorage', async () => {
    successServer.listen();
    localStorage.setItem('search', JSON.stringify('naruto'));
    const container = renderWithRouter(<Main />).container;

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
    const container = renderWithRouter(<Main />).container;
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
});
