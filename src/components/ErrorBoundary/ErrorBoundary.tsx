import React, { type ReactNode } from 'react';

type State = {
  hasError: boolean;
};

type Props = {
  children: ReactNode;
};

export class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.log(error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className={'h-dvh w-dvw flex justify-center items-center'}>
          <h1 className={'max-w-96 text-7xl text-center'}>
            Oooops! Something went wrong! <br /> Try to reload the page.
          </h1>
        </div>
      );
    }

    return this.props.children;
  }
}
