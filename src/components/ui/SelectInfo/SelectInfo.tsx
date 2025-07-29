import React from 'react';

type Props = {
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
};

export function SelectInfo(props: Props) {
  return (
    <div className={'flex items-center w-full flex-wrap justify-between'}>
      <p>{props.leftContent}</p>
      <div className={'flex gap-2'}>{props.rightContent}</div>
    </div>
  );
}
