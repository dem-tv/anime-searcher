import { describe, expect, it, vi } from 'vitest';
import {
  fireEvent,
  getByLabelText,
  getByTestId,
  getByText,
  queryByRole,
  queryByText,
  render,
  screen,
} from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import App from './App.tsx';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { API_HOST } from './api/constants.ts';
import { animeListMockResponse } from './__mocks__/animeList.ts';
import { errorMockResponse } from './__mocks__/error.ts';

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

describe('App', () => {
  it('Renders App', () => {
    const container = render(<App />).container;
    expect(container).toBeInTheDocument();
  });

  it('Renders loader search', async () => {
    successServer.listen();
    const container = render(<App />).container;

    const buttonSearch = getByText(container, 'Explore anime!');
    const inputSearch = getByLabelText(container, 'Search');

    screen.debug(container);

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
    const container = render(<App />).container;
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

    const container = render(<App />).container;
    const placeholder = getByText(container, 'No results :(');

    expect(placeholder).toBeInTheDocument();
  });

  it('Renders list of anime on first render when search is set in localStorage', async () => {
    successServer.listen();
    localStorage.setItem('search', JSON.stringify('naruto'));
    const container = render(<App />).container;

    screen.debug(container);
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
    const container = render(<App />).container;
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
