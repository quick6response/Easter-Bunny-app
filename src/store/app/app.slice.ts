import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Platform } from '@vkontakte/vkui/dist/lib/platform';

export type TypeNavigationApp = 'standard' | 'improved';

interface AppState {
  platform: Platform | string;
  fetching: boolean;
  isDesktop: boolean;
  // показ таббара или кнопок
  isViewTabbar: boolean;
  isDisableTabbar: boolean;
  theme: 'dark' | 'light';
  popout: any;
  // хеддер будто
  hasHeader: boolean;
  // хеш запуска приложения
  hashStartApp: string;
  // навигация по приложению
  navigation: TypeNavigationApp;
}

const initialState: AppState = {
  platform: Platform.IOS,
  fetching: false,
  isDesktop: false,
  isViewTabbar: true,
  isDisableTabbar: false,
  popout: undefined,
  theme: 'dark',
  hasHeader: false,
  hashStartApp: '',
  navigation: 'standard',
};

/*
  Состояние приложения
*/

export const appSettingSlice = createSlice({
  name: 'appSetting',
  initialState,
  reducers: {
    // установка темы приложения
    setTheme(state: AppState, action: PayloadAction<AppState['theme']>) {
      state.theme = action.payload;
    },
    // установка платформы запуска приложения
    setPlatform(state: AppState, action: PayloadAction<Platform | string>) {
      state.platform = action.payload;
    },
    // Установка була
    setIsDesktop(state: AppState, action: PayloadAction<boolean>) {
      state.isDesktop = action.payload;
    },
    setHasHeader(state: AppState, action: PayloadAction<boolean>) {
      state.hasHeader = action.payload;
    },
    setPopout(state: AppState, action: PayloadAction<any>) {
      state.popout = action.payload;
    },
    clearPopout(state: AppState) {
      state.popout = undefined;
    },
    // установить начальный хеш
    setHashStartApp(state: AppState, action: PayloadAction<string>) {
      state.hashStartApp = action.payload;
    },
    // изменение состояния видимости таббара
    setViewTabbarApp(state: AppState, action: PayloadAction<boolean>) {
      state.isViewTabbar = action.payload;
    },
    // блокируем таббар
    setDisableTabbarApp(state: AppState, action: PayloadAction<boolean>) {
      state.isDisableTabbar = action.payload;
    },
  },
});
export const { reducer: appSettingReducer, actions: appSettingActions } =
  appSettingSlice;
