import { SplitColCustom } from '@components/UI/Layouts/SplitColCustom';
import { TabbarMobile } from '@components/UI/Tabbar/TabbarMobile';
import { ProfilePage } from '@pages/profile';
import { PanelTypes, ViewTypes } from '@routes/structure.navigate';
import bridge, {
  AnyReceiveMethodName,
  VKBridgeEvent,
} from '@vkontakte/vk-bridge';
import {
  Epic,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  Platform,
  SimpleCell,
  usePlatform,
  View,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { useEffect } from 'react';
import { useRouterActions, useRouterSelector } from 'react-router-vkminiapps';
import { ErrorSnackbar } from './components/UI/Snackbar';
import { useAction } from './hooks/useActions';
import { useSnackbar } from './hooks/useSnackbar';
import { HomePage } from './pages';
import { UserService } from './services/user/user.service';
import { appSettingActions } from './store/app/app.slice';
import { userVkActions } from './store/user/user.vk.slice';

function App() {
  const platform = usePlatform();
  const { setSnackbar } = useSnackbar();
  const appActions = useAction(appSettingActions);
  const userVKActions = useAction(userVkActions);

  const { activeView, activePanel } = useRouterSelector();
  const { toView, toPanel, toBack } = useRouterActions();
  const isVKCOM = platform === Platform.VKCOM;

  useEffect(() => {
    const isMobileDevice = () => {
      return !(
        typeof window.orientation !== 'undefined' ||
        navigator.userAgent.includes('IEMobile')
      );
    };
    appActions.setIsDesktop(isMobileDevice());

    console.log('IS_PK', isMobileDevice());
    console.log('Platform', platform);
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
          const user = await UserService.getInfo();
          if (!user)
            return setSnackbar(
              <ErrorSnackbar>Ошибка получения данных о вас.</ErrorSnackbar>,
            );
          userVKActions.setUserVk(user);
        };
      }
    });

    const getRandomUser = async () => {
      const user = await UserService.getInfo(1);
      console.log('user', user);
    };
    getRandomUser();
  }, []);
  //
  return (
    <SplitColCustom>
      <Epic activeStory={activeView} tabbar={!isVKCOM && <TabbarMobile />}>
        <View activePanel={activePanel} id={ViewTypes.HOME}>
          <HomePage nav={PanelTypes.MAIN_HOME} />
          <Panel id={PanelTypes.MAIN_ABOUT}>
            <PanelHeader after={<PanelHeaderBack onClick={toBack} />}>
              О нас
            </PanelHeader>
            <SimpleCell onClick={() => toBack()}>Назад</SimpleCell>
          </Panel>
        </View>
        <View activePanel={activePanel} id={ViewTypes.PROFILE}>
          <ProfilePage nav={PanelTypes.PROFILE_HOME} />
        </View>
      </Epic>
    </SplitColCustom>
  );
}

export default App;
