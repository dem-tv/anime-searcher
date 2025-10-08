import { beforeEach, describe, expect, it } from 'vitest';
import { getByText, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { MainLayout } from './MainLayout.tsx';
import { renderWithRouter } from '../../../__test-utils__/renderWithRouter.tsx';
import { ThemeProvider } from '../../ui/Theme/ThemeProvider.tsx';

describe('MainLayout', () => {
  beforeEach(cleanup);

  it('Renders MainLayout', () => {
    const container = renderWithRouter(
      <ThemeProvider>
        <MainLayout>Content</MainLayout>
      </ThemeProvider>
    ).container;

    expect(container).toBeInTheDocument();
  });

  it('Renders children and contentHeader', () => {
    const container = renderWithRouter(
      <ThemeProvider>
        <MainLayout headerContent={'Header'}>Content</MainLayout>
      </ThemeProvider>
    ).container;

    const headerContent = getByText(container, 'Header');
    const childrenContent = getByText(container, 'Content');

    expect(headerContent).toBeInTheDocument();
    expect(childrenContent).toBeInTheDocument();
  });

  it('Renders sideContent', () => {
    const container = renderWithRouter(
      <ThemeProvider>
        <MainLayout sideContent={'sideContent'}>Content</MainLayout>
      </ThemeProvider>
    ).container;

    const sideContent = getByText(container, 'sideContent');
    const childrenContent = getByText(container, 'Content');

    expect(sideContent).toBeInTheDocument();
    expect(childrenContent).toBeInTheDocument();
  });
});
