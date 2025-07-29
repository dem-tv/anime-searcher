import { configureStore } from '@reduxjs/toolkit';
import { selectSlice } from './slices/selectSlice.ts';
import { enableMapSet } from 'immer';

enableMapSet();

const store = configureStore({
  reducer: { select: selectSlice.reducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
