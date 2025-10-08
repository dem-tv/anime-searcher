import { beforeEach, describe, expect, it } from 'vitest';
import { screen, render, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Typography } from './Typography.tsx';

describe('Typography', () => {
  beforeEach(cleanup);

  it('Renders children', () => {
    const children = 'text';

    render(<Typography>{children}</Typography>);

    const childrenNode = screen.getByText(children);
    expect(childrenNode).toBeInTheDocument();
  });

  it('Renders "p" tag by default', () => {
    const element = render(<Typography>text</Typography>).container
      .firstChild as HTMLElement;

    expect(element.tagName).toBe('P');
  });

  it('Renders "h1" tag when set', () => {
    const element = render(<Typography tagName={'h1'}>text</Typography>)
      .container.firstChild as HTMLElement;

    expect(element.tagName).toBe('H1');
  });
});
