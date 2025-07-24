import { beforeEach, describe, expect, it } from 'vitest';
import { render, getByText, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { MainLayout } from './MainLayout.tsx';

describe('MainLayout', () => {
  beforeEach(cleanup);

  it('Renders MainLayout', () => {
    const container = render(<MainLayout>Content</MainLayout>).container;

    expect(container).toBeInTheDocument();
  });

  it('Renders children and contentHeader', () => {
    const container = render(
      <MainLayout headerContent={'Header'}>Content</MainLayout>
    ).container;

    const headerContent = getByText(container, 'Header');
    const childrenContent = getByText(container, 'Content');

    expect(headerContent).toBeInTheDocument();
    expect(childrenContent).toBeInTheDocument();
  });

  it('Renders sideContent', () => {
    const container = render(
      <MainLayout sideContent={'sideContent'}>Content</MainLayout>
    ).container;

    const sideContent = getByText(container, 'sideContent');
    const childrenContent = getByText(container, 'Content');

    expect(sideContent).toBeInTheDocument();
    expect(childrenContent).toBeInTheDocument();
  });
});
