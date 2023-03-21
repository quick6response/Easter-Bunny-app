import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfo } from '@vkontakte/vk-bridge';

interface UserState {
  id: number;
  firstName: string;
  lastName: string;
  photo200: string;
}

const initialState: UserState = {
  id: 0,
  lastName: 'None',
  firstName: 'None',
  photo200: '',
};
/**
 * Пользователь вконтакте
 */
export const userVkSlice = createSlice({
  name: 'userVk',
  initialState,
  reducers: {
    // авторизация
    setUserVk(state: UserState, action: PayloadAction<UserInfo>) {
      state.id = action.payload.id;
      state.firstName = action.payload.first_name;
      state.lastName = action.payload.last_name;
      state.photo200 = action.payload.photo_200;
    },
    // сбросить пользователя
    resetUserVk() {
      return initialState;
    },
  },
});

export const userVkActions = userVkSlice.actions;
export const userVkReducer = userVkSlice.reducer;
