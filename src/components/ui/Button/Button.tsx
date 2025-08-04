import React, {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
} from 'react';
import type { Variant } from '../../../types/ui-variants.types.ts';
import clsx from 'clsx';
import { NavLink, type LinkProps as NavLinkProps } from 'react-router';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
type LinkProps = AnchorHTMLAttributes<HTMLLinkElement>;

type CommonProps = {
  onClick?: () => void;
  children: React.ReactNode;
  variant?: Omit<Variant, 'l'>;
};

type Aboba = {
  button: ButtonProps;
  a: LinkProps;
  NavLink: NavLinkProps;
};

type Props<Tag extends keyof Aboba> = {
  tag?: Tag;
} & CommonProps &
  Aboba[Tag];

export function Button<Tag extends keyof Aboba>(props: Props<Tag>) {
  const {
    children,
    className,
    tag = 'button',
    variant = 'm',
    ...restProps
  } = props;

  const cn = clsx(
    {
      ['bg-orange-400 hover:bg-orange-600 rounded' +
      ' whitespace-nowrap border hover:border-neutral-500 text-black  active:scale-90 flex items-center' +
      ' dark:bg-neutral-800 dark:border-pink-400 dark:hover:bg-neutral-900 dark:text-gray-300']:
        true,
      'px-2 py-1': variant === 'm',
      'px-1 py-0.5 ': variant === 's',
    },
    className
  );

  if (tag === 'button') {
    const { type = 'button', ...buttonProps } = restProps;

    return (
      <button
        className={cn}
        type={type as ButtonProps['type']}
        {...(buttonProps as object)}
      >
        {children}
      </button>
    );
  }

  if (tag === 'a') {
    return (
      <a className={cn} {...(restProps as object)}>
        {children}
      </a>
    );
  }

  const { to, ...navLinkProps } = restProps as unknown as NavLinkProps;
  return (
    <NavLink className={cn} to={to} {...navLinkProps}>
      {children}
    </NavLink>
  );
}
