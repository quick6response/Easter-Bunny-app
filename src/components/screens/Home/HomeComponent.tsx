import { PanelHeaderEgg } from '@components/UI/PanelHeader/PanelHeaderEgg';
import { PostComponent } from '@components/UI/Post/PostComponent';
import { useRouterPopout } from '@hooks/useRouterPopout';
import { ModalTypes } from '@routes/structure.modal';
import { utilsService } from '@services/utils/utils.service';
import { CellButton, Footer, List } from '@vkontakte/vkui';
import { FC } from 'react';
import { fakePost } from '../../../fakeData/fake.post';

export const HomeComponent: FC = () => {
  const { pushParameter } = useRouterPopout();
  return (
    <>
      <PanelHeaderEgg name={'Главная'} />
      <CellButton
        onClick={() => pushParameter('modal', ModalTypes.POST_CREATE)}
      >
        Создать пост
      </CellButton>
      <List>
        {fakePost.map((post) => (
          <PostComponent key={post.id} {...post} />
        ))}
      </List>
      <Footer>
        {utilsService.declOfNum(fakePost.length, ['пост', 'поста', 'постов'])}
      </Footer>
      <div
        style={{
          height:
            'calc(var(--vkui_internal--tabbar_height) + var(--vkui_internal--safe_area_inset_bottom))',
        }}
      />
    </>
  );
};
