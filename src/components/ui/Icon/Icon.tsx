import spriteHref from '/icons/sprite.svg';
import type { SVGProps } from 'react';
import type { IconName } from '../../../types/icons.ts';
import clsx from 'clsx';

type Props = SVGProps<SVGSVGElement> & {
  name: IconName;
  rotate?: '180';
};

export function Icon(props: Props) {
  const { name, rotate, className, ...restProps } = props;

  const cn = clsx({
    'rotate-180': rotate === '180',
    className,
  });

  return (
    <svg className={cn} height={24} width={24} {...restProps}>
      <use href={`${spriteHref}#${name}`} />
    </svg>
  );
}
