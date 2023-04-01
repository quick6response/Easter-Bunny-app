import { configureStore } from '@reduxjs/toolkit';
import { appSettingReducer } from '@store/app/app.slice';
import { postCreateReducer } from '@store/post/post.create.slice';
import { userSliceReducer } from '@store/user/user.slice';
import { userVkReducer } from '@store/user/user.vk.slice';
import { wallPanelSliceReducer } from '@store/wall/wall.panel.slice';

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    appSetting: appSettingReducer,
    postCreate: postCreateReducer,
    userVk: userVkReducer,
    wallPanel: wallPanelSliceReducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
  devTools: true,
});
