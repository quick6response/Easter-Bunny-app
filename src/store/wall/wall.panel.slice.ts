import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type THomeTab = 'all' | 'pin' | 'top';

interface WallPanelSliceState {
  // code
  tab: THomeTab;

  lastDate: string;
  countLike: number;
  oldCountLike?: number | null;
}

const initialState: WallPanelSliceState = {
  // code
  tab: 'all',
  lastDate: '0',
  oldCountLike: null,
  countLike: 0,
};

export const wallPanelSlice = createSlice({
  name: 'wallPanelSlice',
  initialState,
  reducers: {
    // code
    setLastDate(state: WallPanelSliceState, action: PayloadAction<string>) {
      state.lastDate = action.payload;
    },
    setTab(state: WallPanelSliceState, action: PayloadAction<THomeTab>) {
      state.tab = action.payload;
    },
  },
});

export const wallPanelSliceActions = wallPanelSlice.actions;
export const wallPanelSliceReducer = wallPanelSlice.reducer;
