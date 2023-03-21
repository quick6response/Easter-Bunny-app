import { SplitColCustom } from '@components/UI/Layouts/SplitColCustom';
import { TabbarMobile } from '@components/UI/Tabbar/TabbarMobile';
import { PanelTypes, ViewTypes } from '@routes/structure.navigate';
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
import { useRouterActions, useRouterSelector } from 'react-router-vkminiapps';
import { HomePage } from './pages';

function App() {
  const platform = usePlatform();
  const { activeView, activePanel } = useRouterSelector();
  const { toView, toPanel, toBack } = useRouterActions();
  const isVKCOM = platform === Platform.VKCOM;
  //
  return (
    <SplitColCustom>
      <Epic activeStory={activeView} tabbar={!isVKCOM && <TabbarMobile />}>
        <View activePanel={activePanel} id={ViewTypes.HOME}>
          <HomePage id={PanelTypes.MAIN_HOME} />
          <Panel id={PanelTypes.MAIN_ABOUT}>
            <PanelHeader after={<PanelHeaderBack onClick={toBack} />}>
              О нас
            </PanelHeader>
            <SimpleCell onClick={() => toBack()}>Назад</SimpleCell>
          </Panel>
        </View>
      </Epic>
    </SplitColCustom>
  );
}

export default App;
