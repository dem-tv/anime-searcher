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
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.log(
      error,
      // Warning: `captureOwnerStack` is not available in production.
      React.captureOwnerStack()
    );
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
