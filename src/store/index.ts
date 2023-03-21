import { configureStore } from '@reduxjs/toolkit';
import { appSettingReducer } from '@store/app/app.slice';

export const store = configureStore({
  reducer: {
    [appSettingReducer.name]: appSettingReducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware()],
  devTools: true,
});
