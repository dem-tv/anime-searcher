import clsx from 'clsx';
import React from 'react';
import type { Variant } from '../../../types/ui-variants.types.ts';

type Props = {
  variant?: Variant;
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
    className,
    ...restProps
  } = props;

  const cn = clsx(
    {
      'text-center': center,
      'text-sm': variant === 's',
      'text-m': variant === 'm',
      'text-xl': variant === 'l',
      'mb-2': mb === 'sm',
      'mt-2': mt === 'sm',
    },
    className
  );

  return React.createElement(
    tagName,
    { className: cn, ...restProps },
    children
  );
}
