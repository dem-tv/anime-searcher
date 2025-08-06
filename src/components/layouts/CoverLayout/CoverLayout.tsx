import React from 'react';

type Props = {
  children?: React.ReactNode;
  bgUrl?: string;
};

export function CoverLayout(props: Props) {
  const backgroundImage = props.bgUrl ? `url(${props.bgUrl})` : '';

  return (
    <div
      style={{ backgroundImage }}
      className={`flex flex-col gap-2 bg-cover p-4 py-6 overflow-auto min-h-full`}
    >
      {props.children}
    </div>
  );
}
