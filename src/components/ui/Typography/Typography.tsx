import clsx from 'clsx';
import React from 'react';

type Props = {
  variant?: 'h1' | 'h2' | 'sm';
  tagName?: 'span' | 'p' | 'h1' | 'h2';
  center?: boolean;
  mb?: 'sm';
  mt?: 'sm';
  children?: React.ReactNode;
} & React.HTMLAttributes<React.ReactHTMLElement<HTMLElement>>;

export function Typography(props: Props) {
  const {
    variant,
    tagName = 'p',
    center,
    mb,
    mt,
    children,
    ...restProps
  } = props;

  const cn = clsx({
    'text-center': center,
    'text-sm': variant === 'sm',
    'mb-2': mb === 'sm',
    'mt-2': mt === 'sm',
  });

  return React.createElement(
    tagName,
    { className: cn, ...restProps },
    children
  );
}
