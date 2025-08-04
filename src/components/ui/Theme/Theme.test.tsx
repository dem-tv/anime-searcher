import { beforeEach, describe, expect, it, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { ThemeProvider } from './ThemeProvider.tsx';
import { ToggleTheme } from './ToggleTheme.tsx';

function getButtonAndBody() {
  const button = screen.getByRole('button');

  const body = button?.parentNode?.parentNode as HTMLElement | undefined;

  return { button, body };
}

describe('Theme button', () => {
  beforeEach(cleanup);

  it('On click change theme from light to dark and save to localeStorage', () => {
    render(
      <ThemeProvider>
        <ToggleTheme />
      </ThemeProvider>
    );

    const { button, body } = getButtonAndBody();

    expect(body?.className).toBe('light');

    fireEvent.click(button);

    expect(body?.className).toBe('dark');
    expect(JSON.parse(localStorage.getItem('theme') || '')).toBe('dark');
  });

  it('On click change theme from dark to light and save to localeStorage', () => {
    localStorage.setItem('theme', JSON.stringify('dark'));

    render(
      <ThemeProvider>
        <ToggleTheme />
      </ThemeProvider>
    );

    const { button, body } = getButtonAndBody();

    expect(body?.className).toBe('dark');

    fireEvent.click(button);

    expect(body?.className).toBe('light');
    expect(JSON.parse(localStorage.getItem('theme') || '')).toBe('light');
  });

  it('Render theme depending on matchMedia if it is not set to LS', () => {
    localStorage.removeItem('theme');

    vi.spyOn(window, 'matchMedia').mockImplementation(
      () =>
        ({
          matches: true,
        }) as MediaQueryList
    );

    render(
      <ThemeProvider>
        <ToggleTheme />
      </ThemeProvider>
    );

    const { body } = getButtonAndBody();

    expect(body?.className).toBe('dark');
  });
});
