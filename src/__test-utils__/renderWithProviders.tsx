import React from 'react';
import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';

import { type AppStore, type RootState, setupStore } from '../store';

type ExtendedRenderOptions = {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
} & Omit<RenderOptions, 'queries'>;

export function renderWithProviders(
  ui: React.ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {}
) {
  const {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions;

  const ElementWithProvider = () => <Provider store={store}>{ui}</Provider>;

  return {
    store,
    ...render(<ElementWithProvider />, renderOptions),
  };
}
