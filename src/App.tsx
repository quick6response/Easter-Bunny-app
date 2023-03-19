import {
  Epic,
  Panel,
  PanelHeader,
  PanelHeaderBack,
  SimpleCell,
  View,
} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';
import { useState } from 'react';
import { useRouterActions, useRouterSelector } from 'react-router-vkminiapps';
import { HomePage } from './pages/home/HomePage';
import { PanelTypes, ViewTypes } from './structure.navigate';

function App() {
  const [count, setCount] = useState(0);
  const { activeView, activePanel } = useRouterSelector();
  const { toView, toPanel, toBack } = useRouterActions();
  //
  return (
    <Epic activeStory={activeView}>
      <View activePanel={activePanel} id={ViewTypes.MAIN}>
        <HomePage id={PanelTypes.MAIN_HOME} />
        <Panel id={PanelTypes.MAIN_ABOUT}>
          <PanelHeader after={<PanelHeaderBack onClick={toBack} />}>
            О нас
          </PanelHeader>
          <SimpleCell onClick={() => toBack()}>Назад</SimpleCell>
        </Panel>
      </View>
    </Epic>
  );
}

export default App;
