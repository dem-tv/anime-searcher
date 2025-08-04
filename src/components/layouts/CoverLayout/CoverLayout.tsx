import React from 'react';

type Props = {
  children?: React.ReactNode;
  bgUrl: string;
};

export function CoverLayout(props: Props) {
  return (
    <div
      style={{ backgroundImage: `url(${props.bgUrl})` }}
      className={`flex flex-col gap-2 bg-cover p-4 py-6 overflow-auto min-h-full`}
    >
      {props.children}
    </div>
  );
}
