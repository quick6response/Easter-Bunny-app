import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdvertisingSliceState {
  // code
  isAdBlock: boolean;

  lastViewed?: string;
}

const initialState: AdvertisingSliceState = {
  // code
  isAdBlock: false,
};

export const advertisingSlice = createSlice({
  name: 'advertisingSlice',
  initialState,
  reducers: {
    // code
    setId(state: AdvertisingSliceState, action: PayloadAction<boolean>) {
      state.isAdBlock = action.payload;
    },
  },
});

export const advertisingSliceActions = advertisingSlice.actions;
export const advertisingSliceReducer = advertisingSlice.reducer;
