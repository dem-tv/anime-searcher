import React, { type HTMLAttributes } from 'react';

type Props = {
  onClick?: () => void;
  children: React.ReactNode;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
} & HTMLAttributes<HTMLButtonElement>;

export function Button(props: Props) {
  const { type: buttonType = 'button', children, ...restProps } = props;

  return (
    <button
      className={
        'bg-pink-950 px-2 min-h-12 rounded-sm whitespace-nowrap border-2 text-white active:scale-90'
      }
      type={buttonType}
      {...restProps}
    >
      {children}
    </button>
  );
}
