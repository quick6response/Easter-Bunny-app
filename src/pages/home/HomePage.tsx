import { HomeComponent } from '@components/screens/Home/HomeComponent';
import { PanelInterface } from '@routes/interface/panel.interface';
import { FC } from 'react';
import './home.module.css';

const HomePage: FC<PanelInterface> = () => {
  return (
    <>
      <HomeComponent />
    </>
  );
};

export default HomePage;
