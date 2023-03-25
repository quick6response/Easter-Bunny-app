import { HomeComponent } from '@components/screens/Home/HomeComponent';
import { PanelInterface } from '@routes/interface/panel.interface';
import { Panel } from '@vkontakte/vkui';
import { FC } from 'react';
import './home.module.css';

const HomePage: FC<PanelInterface> = ({ nav }) => {
  return (
    <>
      <Panel nav={nav}>
        <HomeComponent />
      </Panel>
    </>
  );
};

export default HomePage;
