import { PostModel } from '@models/post.model';
import { FC } from 'react';
import styles from './image.module.css';

type TImagePost = Pick<PostModel, 'text' | 'photo'>;

export const ImagePost: FC<TImagePost> = ({ text, photo }) => {
  return (
    <img className={styles.image} loading="lazy" src={photo.url} alt={text} />
  );
};
