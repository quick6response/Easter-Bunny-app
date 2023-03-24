import { PanelHeaderEgg } from '@components/UI/PanelHeader/PanelHeaderEgg';
import { PostComponent } from '@components/UI/Post/PostComponent';
import { SuccessSnackbar } from '@components/UI/Snackbar';
import { useSnackbar } from '@hooks/useSnackbar';
import { utilsService } from '@services/utils/utils.service';
import { Button, Footer, List } from '@vkontakte/vkui';
import { FC } from 'react';
import { fakePost } from '../../../fakeData/fake.post';

export const HomeComponent: FC = () => {
  const { setSnackbar } = useSnackbar();
  return (
    <>
      <PanelHeaderEgg name={'Главная'} />

      <List>
        {fakePost.map((post) => (
          <PostComponent key={post.id} {...post} />
        ))}
      </List>
      <Footer>
        {utilsService.declOfNum(fakePost.length, ['пост', 'поста', 'постов'])}
      </Footer>
      <Button
        onClick={() => setSnackbar(<SuccessSnackbar>Вася</SuccessSnackbar>)}
      >
        Кликни
      </Button>
      <div
        style={{
          height:
            'calc(var(--vkui_internal--tabbar_height) + var(--vkui_internal--safe_area_inset_bottom))',
        }}
      />
    </>
  );
};
