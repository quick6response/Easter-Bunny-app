import { PostModel } from '@models/post.model';
import bridge from '@vkontakte/vk-bridge';
import { Gallery } from '@vkontakte/vkui';
import { FC } from 'react';
import styles from './image.module.css';

type TImagePost = Pick<PostModel, 'text' | 'photo'>;

const onClickPhoto = (photo: string) => {
  bridge.send('VKWebAppShowImages', {
    images: [photo],
  });
};

export const ImagePost: FC<TImagePost> = ({ text, photo }) => {
  return (
    <Gallery className={styles.block}>
      <img
        className={styles.image}
        loading="lazy"
        src={photo.url}
        alt={text}
        onClick={() => onClickPhoto(photo.url)}
      />
    </Gallery>
  );
};
