import { PostInfoComponent } from '@components/screens/PostInfo/PostInfoComponent';
import { PanelHeaderEgg } from '@components/UI/PanelHeader/PanelHeaderEgg';
import { PanelInterface } from '@routes/interface/panel.interface';
import { Panel } from '@vkontakte/vkui';
import { FC } from 'react';
import { fakePost } from '../../fakeData/fake.post';

const PostInfoPage: FC<PanelInterface> = ({ nav }) => {
  return (
    <>
      <Panel nav={nav}>
        <PanelHeaderEgg name={'Запись'} />
        <PostInfoComponent {...fakePost[1]} />;
      </Panel>
    </>
  );
};

export default PostInfoPage;
