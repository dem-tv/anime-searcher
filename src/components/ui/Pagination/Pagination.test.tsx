import { beforeEach, describe, expect, it } from 'vitest';
import { cleanup, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { renderWithRouter } from '../../../__test-utils__/renderWithRouter.tsx';
import { Pagination } from './Pagination.tsx';

const props = {
  currentPage: 1,
  hasNext: false,
  paginationLink: (page: number) => `/${page}`,
  onChangePagination: () => {},
};

describe('Pagination', () => {
  beforeEach(cleanup);

  it('Does`nt render anything when only one page', () => {
    const element = renderWithRouter(<Pagination {...props} />).container
      .firstChild;

    expect(element).toBeNull();
  });

  it('Renders prev link when it exists', () => {
    renderWithRouter(<Pagination {...props} currentPage={2} />);

    const prevLink = screen.getByRole('link', { name: 'Prev' });
    const currentPage = screen.getByText('Current page: 2');

    expect(prevLink).toBeInTheDocument();
    expect(currentPage).toBeInTheDocument();
  });

  it('Renders next link when it exists', () => {
    renderWithRouter(<Pagination {...props} currentPage={2} hasNext />);

    const prevLink = screen.getByRole('link', { name: 'Next' });
    const currentPage = screen.getByText('Current page: 2');

    expect(prevLink).toBeInTheDocument();
    expect(currentPage).toBeInTheDocument();
  });

  it('Next and Prev links has correct url depending on paginationLink', () => {
    const getLink = (page: number) => `/some/${page}`;

    renderWithRouter(
      <Pagination {...props} currentPage={2} hasNext paginationLink={getLink} />
    );

    const nextLink = screen.getByRole('link', { name: 'Next' });
    const prevLink = screen.getByRole('link', { name: 'Prev' });
    const currentPage = screen.getByText('Current page: 2');

    expect(prevLink).toHaveAttribute('href', '/some/1');
    expect(nextLink).toHaveAttribute('href', '/some/3');
    expect(currentPage).toBeInTheDocument();
  });
});
