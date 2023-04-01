import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WallPanelSliceState {
  // code
  lastDate: string;
}

const initialState: WallPanelSliceState = {
  // code
  lastDate: '0',
};

export const wallPanelSlice = createSlice({
  name: 'wallPanelSlice',
  initialState,
  reducers: {
    // code
    setLastDate(state: WallPanelSliceState, action: PayloadAction<string>) {
      state.lastDate = action.payload;
    },
  },
});

export const wallPanelSliceActions = wallPanelSlice.actions;
export const wallPanelSliceReducer = wallPanelSlice.reducer;
