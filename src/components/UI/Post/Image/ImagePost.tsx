import { ErrorSnackbar } from '@components/UI/Snackbar';
import { useAppSelector } from '@hooks/useAppSelector';
import { useSnackbar } from '@hooks/useSnackbar';
import { PostModel } from '@models/post.model';
import bridge from '@vkontakte/vk-bridge';
import { Gallery } from '@vkontakte/vkui';
import { FC } from 'react';
import styles from './image.module.css';

type TImagePost = Pick<PostModel, 'text'> & {
  photo: string;
};

export const ImagePost: FC<TImagePost> = ({ text, photo }) => {
  const { setSnackbar } = useSnackbar();
  const isDesktop = useAppSelector((state) => state.appSetting.isDesktop);

  const onClickPhoto = () => {
    try {
      bridge.send('VKWebAppShowImages', {
        images: [photo],
      });
    } catch {
      setSnackbar(
        <ErrorSnackbar>
          Ваша платформа не поддерживаем открытие фото. Извините.
        </ErrorSnackbar>,
      );
    }
  };

  return (
    <Gallery className={styles.block}>
      <img
        className={styles.image}
        style={{
          cursor: !isDesktop ? 'pointer' : 'unset',
        }}
        src={photo}
        alt={text?.slice(0, 50)}
        onClick={!isDesktop ? () => onClickPhoto() : () => {}}
      />
    </Gallery>
  );
};
