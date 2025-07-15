import React from 'react';
import { ErrorButton } from '../components/ErrorButton.tsx';

type Props = {
  headerContent: React.ReactNode;
  children: React.ReactNode | undefined;
};

export class MainLayout extends React.Component<Props> {
  render() {
    return (
      <div className={'bg-neutral-100 text-xl font-mono min-h-dvh'}>
        <header
          className={
            'flex justify-center p-8 border-b-2 backdrop-blur fixed w-full z-10'
          }
        >
          {this.props.headerContent}
          <ErrorButton />
        </header>
        <main className={'p-8 pt-44 h-full flex-1 min-h-dvh'}>
          {this.props.children}
        </main>
      </div>
    );
  }
}
