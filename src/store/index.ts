import { configureStore } from '@reduxjs/toolkit';
import { appSettingReducer } from '@store/app/app.slice';
import { adminModerationSliceReducer } from '@store/moderation/admin.moderation.slice';
import { postCreateReducer } from '@store/post/post.create.slice';
import { postInfoSliceReducer } from '@store/post/post.info.slice';
import { userSliceReducer } from '@store/user/user.slice';
import { userVkReducer } from '@store/user/user.vk.slice';
import { wallPanelSliceReducer } from '@store/wall/wall.panel.slice';

export const store = configureStore({
  reducer: {
    user: userSliceReducer,
    appSetting: appSettingReducer,
    postInfo: postInfoSliceReducer,
    postCreate: postCreateReducer,
    userVk: userVkReducer,
    wallPanel: wallPanelSliceReducer,
    adminModeration: adminModerationSliceReducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
  devTools: true,
});
