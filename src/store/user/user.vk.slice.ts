import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfo } from '@vkontakte/vk-bridge';

interface UserState {
  id: number;
  firstName: string;
  lastName: string;
  photo200: string;
}

const initialState: UserState = {
  id: 1,
  lastName: 'Павел',
  firstName: 'Дуров',
  photo200:
    'https://sun9-20.userapi.com/s/v1/if1/FB03xyGgrEqPBo0A9LJRFj8LyDeGPvM7NtgPpz_cpDPbhU55jFa1ArsDOHkUnVt3SpEMUHYA.jpg?size=337x337&quality=96&crop=514,119,337,337&ava=1',
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
