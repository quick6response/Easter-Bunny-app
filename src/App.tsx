import { useAuthUser } from '@api/auth/useAuthUser';
import { useGetSlides } from '@api/version/hooks/useGetSlides';
import { SplitColCustom } from '@components/UI/Layouts/SplitColCustom';
import { ErrorSnackbar, SnackbarProvider } from '@components/UI/Snackbar';
import { TabbarMobile } from '@components/UI/Tabbar/TabbarMobile';
import { appConfig } from '@config/app.config';
import { useAction } from '@hooks/useActions';
import { useSnackbar } from '@hooks/useSnackbar';
import { Epic, useInitialLocation, View } from '@itznevikat/router';
import { ErrorBoundary } from '@pages/ErrorBoundary';
import { ErrorPage } from '@pages/ErrorPage';
import { FallBack404Page } from '@pages/FallBack404Page';
import HomePage from '@pages/home/HomePage';
import { routerService } from '@routes/router.service';

import { PanelTypes, ViewTypes } from '@routes/structure.navigate';
import { advertisingService } from '@services/advertising/advertising.service';
import { utilsService } from '@services/utils/utils.service';
import { VkSlidesService } from '@services/vk/vk.slides.service';
import { vkStorageService } from '@services/vk/vk.storage.service';
import { appSettingActions } from '@store/app/app.slice';
import { userVkActions } from '@store/user/user.vk.slice';
import bridge, {
  AnyReceiveMethodName,
  VKBridgeEvent,
} from '@vkontakte/vk-bridge';
import { AppRoot, Platform, usePlatform } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { useEffect } from 'react';
import {
  AdminHomePage,
  AdminModerationPage,
  AdminModerationReportPage,
  PostInfoPage,
  PostPinPage,
  ProfilePage,
  ProfileSettingsPage,
  ProfileUserPage,
} from './pages';

function App() {
  const platform = usePlatform();
  const { setSnackbar } = useSnackbar();
  const { hash } = useInitialLocation();
  const appActions = useAction(appSettingActions);
  const userVKActions = useAction(userVkActions);
  const { mutateAsync: loginUser } = useAuthUser();
  const { mutateAsync: mutateVersionAsync } = useGetSlides();
  const isVKCOM = platform === Platform.VKCOM;

  useEffect(() => {
    const onOneStart = async () => {
      const getStorageVersion = await vkStorageService.getValue(
        `version_app_${appConfig.version}`,
      );
      // console.log(getStorageVersion);
      if (getStorageVersion) return;
      // не смотрели
      const get = await mutateVersionAsync(appConfig.version);
      if (get?.length === 0)
        return console.log('Показывать о новой версии нечего.');

      const showSlide = await VkSlidesService.show(appConfig.version, get);
    };
    appActions.setIsDesktop(utilsService.isMobileDevice());
    appActions.setPlatform(platform);

    appActions.setHasHeader(utilsService.isMobileDevice());

    bridge.subscribe(async (event: VKBridgeEvent<AnyReceiveMethodName>) => {
      if (!event?.detail) return;
      const { type, data } = event.detail;
      if (type === 'VKWebAppUpdateConfig') {
        // проверка темы на мобилке и в вк.
        const darkTheme =
          data.scheme === 'space_gray' || data.scheme === 'vkcom_dark';
        appActions.setTheme(darkTheme ? 'dark' : 'light');
      }
    });
    const getUserVk = async () => {
      const user = await bridge.send('VKWebAppGetUserInfo', {});
      if (!user)
        return setSnackbar(
          <ErrorSnackbar>Ошибка получения данных о вас.</ErrorSnackbar>,
        );
      const userLogin = await loginUser();
      const getStartUserProfile = routerService.getParamStartUserProfile();
      if (!getStartUserProfile) {
        const parameterStart = routerService.getHashStart(
          hash,
          userLogin.admin,
        );
        appActions.setHashStartApp(parameterStart);
      }
      if (getStartUserProfile) {
        console.log('Запущено из профиля id:', getStartUserProfile);
        appActions.setHashStartApp(`/wall/user?userId=${getStartUserProfile}`);
      }
      await advertisingService.showBanner();
      // await advertisingService.show(EAdsFormats.REWARD);
      onOneStart();
      userVKActions.setUserVk(user);
    };
    getUserVk();
  }, []);

  return (
    <AppRoot>
      <ErrorBoundary fallback={<ErrorPage nav={PanelTypes.ERROR} />}>
        <SnackbarProvider>
          <SplitColCustom>
            <Epic nav="/" tabbar={!isVKCOM && <TabbarMobile />}>
              <View nav="/">
                <ErrorPage nav={PanelTypes.ERROR} />
                <FallBack404Page nav={PanelTypes.NOT_FOUND} />
              </View>

              <View nav={ViewTypes.HOME}>
                <HomePage nav={PanelTypes.MAIN_HOME} />
                <PostInfoPage nav={PanelTypes.POST_INFO} />
                <PostPinPage nav={PanelTypes.POST_PIN} />
                <ProfileUserPage nav={PanelTypes.PROFILE_USER} />
              </View>

              <View nav={ViewTypes.PROFILE}>
                <ProfilePage nav={PanelTypes.PROFILE_HOME} />
                <PostInfoPage nav={PanelTypes.POST_INFO} />
                <PostPinPage nav={PanelTypes.POST_PIN} />
                <ProfileUserPage nav={PanelTypes.PROFILE_USER} />
                <ProfileSettingsPage nav={PanelTypes.PROFILE_SETTING} />
              </View>

              <View nav={ViewTypes.ADMIN}>
                {/*// Добавить прослойку с проверкой прав доступа*/}
                <AdminHomePage nav={PanelTypes.ADMIN_HOME} />
                <AdminModerationPage nav={PanelTypes.ADMIN_MODERATION} />
                <AdminModerationReportPage
                  nav={PanelTypes.ADMIN_MODER_REPORTS}
                />
                <PostInfoPage nav={PanelTypes.POST_INFO} />
                <ProfileUserPage nav={PanelTypes.PROFILE_USER} />
              </View>
            </Epic>
          </SplitColCustom>
        </SnackbarProvider>
      </ErrorBoundary>
    </AppRoot>
  );
}

export default App;
