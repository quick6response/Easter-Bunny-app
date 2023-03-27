import { UserModel } from '@models/user.model';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type UserSliceState = UserModel;

const initialState: UserSliceState = {
  // code
  id: 0,
  last_name: '',
  photo: '',
  first_name: '',
  id_vk: 0,
};

export const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    // code
    setUser(state: UserSliceState, action: PayloadAction<UserSliceState>) {
      return action.payload;
    },
  },
});

export const userSliceActions = userSlice.actions;
export const userSliceReducer = userSlice.reducer;
