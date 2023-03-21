import { PanelHeader } from '@vkontakte/vkui';
import { FC, useState } from 'react';
import { PanelTypes } from '../../routes/structure.navigate';
import './home.module.css';

interface IHomePage {
  id: PanelTypes;
}

interface IPhoto {
  id: number;
  url: string;
  title: string;
}

const HomePage: FC<IHomePage> = () => {
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [index, setIndex] = useState(0);

  return (
    <>
      <PanelHeader>Главая</PanelHeader>
    </>
  );
};

export default HomePage;
