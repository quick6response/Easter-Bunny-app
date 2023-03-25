import { PostInfoComponent } from '@components/screens/PostInfo/PostInfoComponent';
import { PanelHeaderEgg } from '@components/UI/PanelHeader/PanelHeaderEgg';
import { useParams } from '@itznevikat/router';
import { PanelInterface } from '@routes/interface/panel.interface';
import { Panel } from '@vkontakte/vkui';
import { FC } from 'react';
import { fakePost } from '../../fakeData/fake.post';

const PostInfoPage: FC<PanelInterface> = ({ nav }) => {
  const { hash } = useParams<{ hash: string }>();
  console.log(hash);
  const findPost = fakePost.find((post) => post.hash === hash);

  return (
    <>
      <Panel nav={nav}>
        <PanelHeaderEgg name={'Запись'} />

        <PostInfoComponent post={findPost} />
      </Panel>
    </>
  );
};

export default PostInfoPage;
