import React from 'react';
import { NavLink } from 'react-router';
import clsx from 'clsx';

type Props = {
  headerContent?: React.ReactNode;
  children?: React.ReactNode;
  sideContent?: React.ReactNode;
  closeElement?: React.ReactNode;
  bottomContent?: React.ReactNode;
};

export function MainLayout(props: Props) {
  const cn = clsx({
    'grid-cols-2': props.sideContent,
    'grid-cols-1': !props.sideContent,
    'bg-neutral-100 text-xl overflow-hidden font-mono h-dvh grid grid-rows-[1fr,fit-content]': true,
  });

  return (
    <div className={cn}>
      <div className={'overflow-auto'}>
        <header
          className={
            'flex items-center gap-6 justify-center p-8 border-b-2 backdrop-blur sticky top-0 w-full z-10'
          }
        >
          {props.headerContent}
          {props.closeElement && (
            <div className={'ml-auto'}>{props.closeElement}</div>
          )}
        </header>
        <main className={'p-8 flex-1 min-h-dvh'}>{props.children}</main>
        <footer className={'p-4 flex justify-center border-t'}>
          <NavLink
            className={
              'text-gray-600 mx-auto inline-block transition-colors hover:text-pink-400'
            }
            to={'/about'}
          >
            About developer
          </NavLink>
        </footer>
      </div>
      {props.sideContent && (
        <aside className={'overflow-auto'}>{props.sideContent}</aside>
      )}
      {props.bottomContent && (
        <div className="border-t px-8 py-2 row-start-2 row-end-3 col-end-3 col-start-1">
          {props.bottomContent}
        </div>
      )}
    </div>
  );
}
