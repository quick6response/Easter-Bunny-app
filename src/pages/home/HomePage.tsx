import { PanelHeader } from '@vkontakte/vkui';
import axios from 'axios';
import { FC, useEffect, useState } from 'react';
import { PanelTypes } from '../../structure.navigate';
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

  useEffect(() => {
    const fetchPhotos = async () => {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/photos?_limit=20',
      );
      setPhotos(response.data);
    };
    fetchPhotos();
  }, []);

  return (
    <>
      <PanelHeader>Глава</PanelHeader>
      <div className="photo-swipe">
        <div
          className="photo-swipe__container"
          style={{
            transform: `translateY(${-index * 45.5}vh)`,
          }}
        >
          {photos.map((photo) => (
            <div
              key={photo.id}
              className={`photo-swipe__item ${
                currentPhoto === index ? 'photo-swipe__item--active' : ''
              }`}
            >
              {' '}
              <img
                className="photo-swipe__image"
                src={photo.url}
                width="100%"
                height="100%"
                loading="lazy"
                alt=""
              />
              <div> {currentPhoto === index ? 'Актив' : ''}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomePage;
