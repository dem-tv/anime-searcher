import { describe, expect, it } from 'vitest';
import { render, getByTestId } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { PageLoader } from './PageLoader.tsx';

describe('PageLoader', () => {
  const container = render(<PageLoader />).container;
  const loader = getByTestId(container, 'page-loader');

  it('Renders PageLoader', () => {
    expect(loader).toBeInTheDocument();
  });

  it('Adds aria-busy attribute', () => {
    expect(loader).toHaveAttribute('aria-busy', 'true');
  });
});
