import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { AnimeShort } from '../../api/types/anime.types.ts';

type State = {
  selectedItems: Record<string, AnimeShort | null>;
};

const initialState: State = {
  selectedItems: {},
};

export const selectSlice = createSlice({
  name: 'select',
  initialState: initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<AnimeShort>) => {
      if (state.selectedItems[action.payload.id]) {
        return;
      }

      state.selectedItems[action.payload.id] = action.payload;
    },

    unselectItem: (state, action: PayloadAction<AnimeShort>) => {
      state.selectedItems[action.payload.id] = null;
    },

    unselectAll: (state) => {
      state.selectedItems = {};
    },
  },
});
