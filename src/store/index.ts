import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { selectSlice } from './slices/selectSlice.ts';
import { baseApi } from './api/base.ts';

const rootReducer = combineReducers({
  select: selectSlice.reducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
