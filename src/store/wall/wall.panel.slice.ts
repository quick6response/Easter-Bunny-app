import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type THomeTab = 'all' | 'pin' | 'top';

interface WallPanelSliceState {
  // code
  tab: THomeTab;

  lastDate: string;
  countLike: number;
  oldCountLike?: number | null;

  countViewPost: number;

  countViewProfile: number;
}

const initialState: WallPanelSliceState = {
  // code
  tab: 'all',
  lastDate: '0',
  oldCountLike: null,
  countLike: 0,
  countViewPost: 0,

  countViewProfile: 0,
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
    plusCount(state: WallPanelSliceState) {
      state.countViewPost += 1;
    },
    plusLike(state: WallPanelSliceState) {
      state.countLike += 1;
    },

    plusProfileInfo(state: WallPanelSliceState) {
      state.countViewProfile += 1;
    },
  },
});

export const wallPanelSliceActions = wallPanelSlice.actions;
export const wallPanelSliceReducer = wallPanelSlice.reducer;
