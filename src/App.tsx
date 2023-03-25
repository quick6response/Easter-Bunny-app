import { SplitColCustom } from '@components/UI/Layouts/SplitColCustom';
import { ErrorSnackbar, SnackbarProvider } from '@components/UI/Snackbar';
import { TabbarMobile } from '@components/UI/Tabbar/TabbarMobile';
import { useAction } from '@hooks/useActions';
import { useSnackbar } from '@hooks/useSnackbar';
import { Epic, Match, View } from '@itznevikat/router';
import { PanelTypes, ViewTypes } from '@routes/structure.navigate';
import { userService } from '@services/user/user.service';
import { appSettingActions } from '@store/app/app.slice';
import { userVkActions } from '@store/user/user.vk.slice';
import bridge, {
  AnyReceiveMethodName,
  VKBridgeEvent,
} from '@vkontakte/vk-bridge';
import { Platform, usePlatform } from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { useEffect } from 'react';
import { HomePage, PostInfoPage, ProfilePage } from './pages';

function App() {
  const platform = usePlatform();
  const { setSnackbar } = useSnackbar();
  const appActions = useAction(appSettingActions);
  const userVKActions = useAction(userVkActions);
  const isVKCOM = platform === Platform.VKCOM;

  useEffect(() => {
    const isMobileDevice = () => {
      return !(
        typeof window.orientation !== 'undefined' ||
        navigator.userAgent.includes('IEMobile')
      );
    };
    appActions.setIsDesktop(isMobileDevice());

    // console.log('IS_PK', isMobileDevice());
    // console.log('Platform', platform);
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
      if (type === 'VKWebAppInitResult') {
        const getUserVk = async () => {
          const user = await userService.getInfo();
          if (!user)
            return setSnackbar(
              <ErrorSnackbar>Ошибка получения данных о вас.</ErrorSnackbar>,
            );
          userVKActions.setUserVk(user);
        };
        getUserVk();
      }
    });
  }, []);

  return (
    <SnackbarProvider>
      <SplitColCustom>
        <Match initialURL={ViewTypes.HOME}>
          <Epic nav="epic" tabbar={!isVKCOM && <TabbarMobile />}>
            <View nav={ViewTypes.HOME}>
              <HomePage nav={PanelTypes.MAIN_HOME} />
              <PostInfoPage nav={PanelTypes.POST_INFO} />
            </View>

            <View nav={ViewTypes.PROFILE}>
              <ProfilePage nav={PanelTypes.PROFILE_HOME} />
              <PostInfoPage nav={PanelTypes.POST_INFO} />
            </View>
          </Epic>
        </Match>
        {/*<Epic activeStory={activeView} tabbar={!isVKCOM && <TabbarMobile />}>*/}
        {/*  <View activePanel={activePanel} id={ViewTypes.HOME}>*/}
        {/*    <HomePage nav={PanelTypes.MAIN_HOME} />*/}
        {/*    <PostInfoPage nav={PanelTypes.POST_INFO} />*/}
        {/*  </View>*/}
        {/*  <View activePanel={activePanel} id={ViewTypes.PROFILE}>*/}
        {/*    <ProfilePage nav={PanelTypes.PROFILE_HOME} />*/}
        {/*    <PostInfoPage nav={PanelTypes.POST_INFO} />*/}
        {/*  </View>*/}
        {/*</Epic>*/}
      </SplitColCustom>
    </SnackbarProvider>
  );
}

export default App;
