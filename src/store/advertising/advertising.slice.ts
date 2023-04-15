import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdvertisingSliceState {
  // code
  isAdBlock: boolean;

  lastViewed: number;
}

const initialState: AdvertisingSliceState = {
  // code
  isAdBlock: false,
  lastViewed: 0,
};

export const advertisingSlice = createSlice({
  name: 'advertisingSlice',
  initialState,
  reducers: {
    // code
    setIsAdBlock(state: AdvertisingSliceState, action: PayloadAction<boolean>) {
      state.isAdBlock = action.payload;
    },
    // последний просмотр рекламы
    setLastViewDate(
      state: AdvertisingSliceState,
      action: PayloadAction<{ date: number }>,
    ) {
      state.lastViewed = action.payload.date;
    },
  },
});

export const advertisingSliceActions = advertisingSlice.actions;
export const advertisingSliceReducer = advertisingSlice.reducer;
