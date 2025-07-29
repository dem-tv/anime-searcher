import type { HTMLProps, ReactNode } from 'react';

type Props = {
  children: ReactNode;
  onSelect?: () => void;
  selected?: boolean;
} & HTMLProps<HTMLDivElement>;

export function SelectCard(props: Props) {
  const { selected, children, onSelect, ...restProps } = props;

  return (
    <div
      {...restProps}
      className={
        'p-2 border flex flex-col gap-6 items-start bg-neutral-200 rounded-sm'
      }
    >
      <input
        className={'cursor-pointer h-5 w-5'}
        checked={selected}
        onChange={onSelect}
        type="checkbox"
        aria-label={'select'}
      />
      {children}
    </div>
  );
}
