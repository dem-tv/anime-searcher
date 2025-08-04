import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { selectSlice } from './slices/selectSlice.ts';

const rootReducer = combineReducers({
  select: selectSlice.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
