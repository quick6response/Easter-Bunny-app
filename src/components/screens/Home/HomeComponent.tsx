import { PanelHeaderMainPanel } from '@components/UI/PanelHeader/PanelHeaderMainPanel';
import { PostsComponent } from '@components/UI/Post/PostsComponent';
import { FC } from 'react';
import { fakePost } from '../../../fakeData/fake.post';

export const HomeComponent: FC = () => {
  return (
    <>
      <PanelHeaderMainPanel name={'Главная'} />
      <PostsComponent posts={fakePost} />
      <div
        style={{
          height:
            'calc(var(--vkui_internal--tabbar_height) + var(--vkui_internal--safe_area_inset_bottom))',
        }}
      />
    </>
  );
};
