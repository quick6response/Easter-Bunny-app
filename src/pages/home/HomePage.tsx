import { HomeComponent } from '@components/screens/Home/HomeComponent';
import { PanelInterface } from '@routes/interface/panel.interface';
import { Panel } from '@vkontakte/vkui';
import { FC } from 'react';

const HomePage: FC<PanelInterface> = ({ nav }) => {
  return (
    <>
      <Panel nav={nav}>
        {/*<PanelHeaderProfileUser name={'Главная'} />*/}
        <HomeComponent />
      </Panel>
    </>
  );
};

export default HomePage;
