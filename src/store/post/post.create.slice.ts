import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PostCreateState {
  text: string;
}

const initialState: PostCreateState = {
  text: '',
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
    reset() {
      return initialState;
    },
  },
});

export const postCreateActions = postCreateSlice.actions;
export const postCreateReducer = postCreateSlice.reducer;
