import React from 'react';

type Props = {
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
};

export function SelectInfo(props: Props) {
  return (
    <div className={'flex items-center w-full flex-wrap justify-between'}>
      {props.leftContent}
      <div className={'flex gap-2 ml-auto'}>{props.rightContent}</div>
    </div>
  );
}
