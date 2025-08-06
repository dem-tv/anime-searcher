import React from 'react';
import { NavLink } from 'react-router';
import clsx from 'clsx';
import { ToggleTheme } from '../../ui/Theme/ToggleTheme.tsx';

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
    'bg-neutral-100 dark:bg-neutral-900 dark:text-gray-300 text-xl overflow-hidden font-mono h-dvh grid grid-rows-[1fr,fit-content]': true,
  });

  return (
    <div className={cn}>
      <div
        className={
          'overflow-auto grid grid-rows-[min-content,auto,min-content]'
        }
      >
        <header
          className={
            'flex items-center dark:border-gray-800 gap-2 justify-center p-4 py-6 border-b backdrop-blur sticky top-0 w-full z-10'
          }
        >
          <ToggleTheme className={'mr-auto'} />
          {props.headerContent}
          {props.closeElement && (
            <div className={'ml-auto'}>{props.closeElement}</div>
          )}
        </header>
        <main className={'p-4 py-6 flex-1 flex flex-col items-start gap-8'}>
          {props.children}
        </main>
        <footer
          className={'p-4 flex justify-center border-t dark:border-gray-800 '}
        >
          <NavLink
            className={
              'text-gray-600 dark:text-gray-300 mx-auto inline-block transition-colors hover:text-pink-400 dark:hover:text-pink-400'
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
        <div className="border-t dark:border-gray-800 px-6 py-2 row-start-2 row-end-3 col-end-3 col-start-1">
          {props.bottomContent}
        </div>
      )}
    </div>
  );
}
