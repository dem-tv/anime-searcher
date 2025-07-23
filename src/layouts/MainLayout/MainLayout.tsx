import React from 'react';
import { ErrorButton } from '../../components/ErrorButton/ErrorButton.tsx';

type Props = {
  headerContent?: React.ReactNode;
  children: React.ReactNode | undefined;
  sideContent?: React.ReactNode | undefined;
};

export function MainLayout(props: Props) {
  return (
    <div
      className={
        'bg-neutral-100 text-xl overflow-hidden font-mono h-dvh grid grid-cols-[repeat(auto-fit,minmax(0,1fr))]'
      }
    >
      <div className={'overflow-auto'}>
        <header
          className={
            'flex flex-wrap items-center gap-6 justify-center p-8 border-b-2 backdrop-blur sticky top-0 w-full z-10'
          }
        >
          {props.headerContent}
          <ErrorButton />
        </header>
        <main className={'p-8 flex-1 min-h-dvh'}>{props.children}</main>
      </div>
      {props.sideContent}
    </div>
  );
}
