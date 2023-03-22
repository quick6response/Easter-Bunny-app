import { PostComponent } from '@components/screens/Home/PostComponent';
import { PanelHeaderEgg } from '@components/UI/PanelHeader/PanelHeaderEgg';
import { SuccessSnackbar } from '@components/UI/Snackbar';
import { useSnackbar } from '@hooks/useSnackbar';
import { Button } from '@vkontakte/vkui';
import { FC } from 'react';
import { fakePost } from '../../../fakeData/fake.post';

export const HomeComponent: FC = () => {
  const { setSnackbar } = useSnackbar();
  return (
    <>
      <PanelHeaderEgg name={'Главная'} />

      {fakePost.map((post) => (
        <PostComponent key={post.id} {...post} />
      ))}

      <Button
        onClick={() => setSnackbar(<SuccessSnackbar>Вася</SuccessSnackbar>)}
      >
        Кликни
      </Button>
    </>
  );
};
