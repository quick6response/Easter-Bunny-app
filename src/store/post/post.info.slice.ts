import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PostInfoSliceState {
  // code
  isPullToRefrech: boolean;
}

const initialState: PostInfoSliceState = {
  // code
  isPullToRefrech: false,
};

export const postInfoSlice = createSlice({
  name: 'postInfoSlice',
  initialState,
  reducers: {
    // code
    setIsPullToRefrech(
      state: PostInfoSliceState,
      action: PayloadAction<boolean>,
    ) {
      state.isPullToRefrech = action.payload;
    },
  },
});

export const postInfoSliceActions = postInfoSlice.actions;
export const postInfoSliceReducer = postInfoSlice.reducer;
