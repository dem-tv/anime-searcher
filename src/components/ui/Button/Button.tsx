import React, {
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
} from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
type LinkProps = AnchorHTMLAttributes<HTMLLinkElement>;

type CommonProps = {
  onClick?: () => void;
  children: React.ReactNode;
};

type Props<Tag extends 'button' | 'a'> = {
  tag?: Tag;
} & CommonProps &
  (Tag extends 'button' ? ButtonProps : LinkProps);

export function Button<Tag extends 'button' | 'a'>(props: Props<Tag>) {
  const { children, tag = 'button', ...restProps } = props;

  const cn =
    'bg-pink-950 px-2 min-h-12 rounded-sm whitespace-nowrap border-2 text-white active:scale-90 flex items-center';

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

  return (
    <a className={cn} {...(restProps as object)}>
      {children}
    </a>
  );
}
