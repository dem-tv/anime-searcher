import { describe, expect, vi, it, beforeEach } from 'vitest';
import { cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';

import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { API_HOST } from '../../api/constants.ts';
import { animeDetailedResponse } from '../../__mocks__/animeDetails.ts';
import { getElementWithRouter } from '../../__test-utils__/renderWithRouter.tsx';
import { AnimeDetails } from './AnimeDetails.tsx';
import { errorMockResponse } from '../../__mocks__/errorResponse.ts';
import { renderWithProviders } from '../../__test-utils__/renderWithProviders.tsx';

const successHandlers = [
  http.post(API_HOST, () => {
    return HttpResponse.json(animeDetailedResponse);
  }),
];

const errorHandlers = [
  http.post(API_HOST, () => {
    return HttpResponse.json(errorMockResponse);
  }),
];

function renderDetails() {
  return renderWithProviders(
    getElementWithRouter(<AnimeDetails />, '/123', '/:animeId')
  );
}

const successServer = setupServer(...successHandlers);
const errorServer = setupServer(...errorHandlers);
describe('AnimeDetails', () => {
  beforeEach(cleanup);

  it('Renders loader search', async () => {
    successServer.listen();
    renderDetails();

    const loader = await vi.waitFor(() => {
      const list = screen.queryByTestId('page-loader');
      expect(list).toBeTruthy();

      return list;
    });

    expect(loader).toBeInTheDocument();
    successServer.close();
  });

  it('Renders details on response', async () => {
    successServer.listen();
    renderDetails();

    const description = await vi.waitFor(() => {
      const description = screen.queryByText(/With Tomura Shigaraki/i);
      expect(description).toBeTruthy();

      return description;
    });

    expect(description).toBeInTheDocument();
    successServer.close();
  });

  it('Renders error message', async () => {
    errorServer.listen();
    renderDetails();

    const errorMessage = await vi.waitFor(() => {
      const description = screen.queryByText('Failed getting Anime');
      expect(description).toBeTruthy();

      return description;
    });

    expect(errorMessage).toBeInTheDocument();
    errorServer.close();
  });
});
