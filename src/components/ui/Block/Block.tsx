import React from 'react';

type Props = {
  children?: React.ReactNode;
};

export function Block(props: Props) {
  return (
    <div
      className={
        'p-2 rounded-md text-white backdrop-blur-sm relative overflow-hidden border after:absolute after:inset-0 after:bg-[#00000080] after:-z-10'
      }
    >
      {props.children}
    </div>
  );
}
