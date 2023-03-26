import { configureStore } from '@reduxjs/toolkit';
import { appSettingReducer } from '@store/app/app.slice';
import { postCreateReducer } from '@store/post/post.create.slice';
import { userVkReducer } from '@store/user/user.vk.slice';

export const store = configureStore({
  reducer: {
    appSetting: appSettingReducer,
    postCreate: postCreateReducer,
    userVk: userVkReducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
  devTools: true,
});
