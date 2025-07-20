import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, getByText } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import { Button } from './Button.tsx';

const textButton = 'text';

const props = {
  onClick: () => {},
};

describe('Button', () => {
  it('Renders ErrorBoundaryTest', () => {
    const button = render(<Button>text</Button>).container;

    expect(button).toBeInTheDocument();
  });

  it('Renders passed text', () => {
    const button = render(<Button>{textButton}</Button>).container;

    const text = getByText(button, textButton);

    expect(text).toBeInTheDocument();
  });

  it('Calls onClick on click', () => {
    const spy = vi.spyOn(props, 'onClick');

    const container = render(
      <Button onClick={props.onClick}>{textButton}</Button>
    ).container;

    const button = getByText(container, textButton);

    fireEvent.click(button);

    expect(spy).toHaveBeenCalled();
  });

  it('Set type "button" by default', () => {
    const container = render(<Button>{textButton}</Button>).container;

    const button = getByText(container, textButton);

    expect(button).toHaveAttribute('type', 'button');
  });

  it('Set type "button" when prop "type is passed"', () => {
    const container = render(
      <Button type={'submit'}>{textButton}</Button>
    ).container;

    const button = getByText(container, textButton);

    expect(button).toHaveAttribute('type', 'submit');
  });
});
