import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PostCreateState {
  text?: string;
  isPhoto: boolean;
}

const initialState: PostCreateState = {
  text: undefined,
  isPhoto: false,
};
/**
 * Пользователь вконтакте
 */
export const postCreateSlice = createSlice({
  name: 'postCreate',
  initialState,
  reducers: {
    // text
    setText(state: PostCreateState, action: PayloadAction<{ text: string }>) {
      state.text = action.payload.text;
    },
    setIsPhoto(state: PostCreateState, action: PayloadAction<boolean>) {
      state.isPhoto = action.payload;
    },
    reset() {
      return initialState;
    },
  },
});

export const postCreateActions = postCreateSlice.actions;
export const postCreateReducer = postCreateSlice.reducer;
