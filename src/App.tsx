import { useAuthUser } from '@api/auth/useAuthUser';
import { useGetSlides } from '@api/version/hooks/useGetSlides';
import { SplitColCustom } from '@components/UI/Layouts/SplitColCustom';
import { ErrorSnackbar, SnackbarProvider } from '@components/UI/Snackbar';
import { TabbarMobile } from '@components/UI/Tabbar/TabbarMobile';
import { appConfig } from '@config/app.config';
import { useAction } from '@hooks/useActions';
import { useSnackbar } from '@hooks/useSnackbar';
import { Epic, View } from '@itznevikat/router';

import { PanelTypes, ViewTypes } from '@routes/structure.navigate';
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
import { HomePage, PostInfoPage, PostPinPage, ProfilePage } from './pages';

function App() {
  const platform = usePlatform();

  const { setSnackbar } = useSnackbar();
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

      bridge
        .send('VKWebAppShowSlidesSheet', {
          slides: get,
        })
        .then(async (data) => {
          if (data.result) {
            // Слайды показаны
            await vkStorageService.create({
              key: `version_app_${appConfig.version}`,
              value: { isView: true },
            });
          }
        })
        .catch((error) => {
          // Ошибка
          console.log(error);
        });
    };
    const isMobileDevice = () => {
      return !(
        typeof window.orientation !== 'undefined' ||
        navigator.userAgent.includes('IEMobile')
      );
    };
    appActions.setIsDesktop(isMobileDevice());
    appActions.setPlatform(platform);
    appActions.setHasHeader(isMobileDevice());

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
      await loginUser();
      onOneStart();
      userVKActions.setUserVk(user);
    };
    getUserVk();
  }, []);

  return (
    <AppRoot>
      <SnackbarProvider>
        <SplitColCustom>
          <Epic nav="/" tabbar={!isVKCOM && <TabbarMobile />}>
            <View nav={ViewTypes.HOME}>
              <HomePage nav={PanelTypes.MAIN_HOME} />
              <PostInfoPage nav={PanelTypes.POST_INFO} />
              <PostPinPage nav={PanelTypes.POST_PIN} />
            </View>

            <View nav={ViewTypes.PROFILE}>
              <ProfilePage nav={PanelTypes.PROFILE_HOME} />
              <PostInfoPage nav={PanelTypes.POST_INFO} />
              <PostPinPage nav={PanelTypes.POST_PIN} />
            </View>
          </Epic>
        </SplitColCustom>
      </SnackbarProvider>
    </AppRoot>
  );
}

export default App;
