import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AdminModerationSliceState {
  // включить подтверждение
  isConfirm: boolean;
  // дата следующего подтверждения
  dateConfirm: Date | null;
}

const initialState: AdminModerationSliceState = {
  // code
  isConfirm: true,
  dateConfirm: null,
};

export const adminModerationSlice = createSlice({
  name: 'adminModerationSlice',
  initialState,
  reducers: {
    // включить подтверждение
    setIsConfirm(
      state: AdminModerationSliceState,
      action: PayloadAction<boolean>,
    ) {
      state.isConfirm = action.payload;
    },
    // установить время след подтверждения
    setDate(state: AdminModerationSliceState, action: PayloadAction<Date>) {
      state.dateConfirm = action.payload;
    },
  },
});

export const adminModerationSliceActions = adminModerationSlice.actions;
export const adminModerationSliceReducer = adminModerationSlice.reducer;
