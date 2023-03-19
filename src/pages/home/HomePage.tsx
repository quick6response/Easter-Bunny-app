import { useWheel } from '@use-gesture/react';
import { Avatar, Image, PanelHeader } from '@vkontakte/vkui';
import { FC, useEffect, useRef, useState } from 'react';
import { PanelTypes } from '../../structure.navigate';
import './home.module.css';
import axios from 'axios';
import { useSwipeable } from 'react-swipeable';
import { Lethargy } from 'lethargy';

interface IHomePage {
  id: PanelTypes;
}

interface IPhoto {
  id: number;
  url: string;
  title: string;
}

const lethargy = new Lethargy();
export const HomePage: FC<IHomePage> = () => {
  const [photos, setPhotos] = useState<IPhoto[]>([]);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [scrolling, setScrolling] = useState('rested');
  const [swipingUp, setSwipingUp] = useState(false);
  const [index, setIndex] = useState(0);
  const handlers = useSwipeable({
    onSwipedDown: () => {
      console.log('down');
      setCurrentPhoto((current) => current - 1);
      setSwipingUp(false);
    },
    onSwipedUp: () => {
      console.log('up');
      setCurrentPhoto((current) => current + 1);
      setSwipingUp(true);
    },
    trackMouse: true,
    trackTouch: true,
  });

  const clamp = (value: number, min: number, max: number) =>
    Math.max(Math.min(max, value), min);

  const bind = useWheel(({ event, last, memo: wait = false }) => {
    if (last) {
      setScrolling('rested');
      return false;
    }

    const s = lethargy.check(event);
    if (!s) return false;

    setScrolling(`lethary says scroll ${s < 0 ? 'down' : 'up'}`);
    if (!wait) {
      setIndex((index_) => clamp(index_ - s, 0, photos.length - 1));
      return true;
    }
  });

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
    <div className="photo-swipe" {...bind()}>
      <div
        className="photo-swipe__container"
        style={{
          transform: `translateY(${-index * 90.5}vh)`,
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
  );
};
