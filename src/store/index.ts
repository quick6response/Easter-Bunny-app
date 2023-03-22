import { configureStore } from '@reduxjs/toolkit';
import { appSettingReducer } from '@store/app/app.slice';
import { userVkReducer } from '@store/user/user.vk.slice';

export const store = configureStore({
  reducer: {
    appSetting: appSettingReducer,
    userVk: userVkReducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
  devTools: true,
});
