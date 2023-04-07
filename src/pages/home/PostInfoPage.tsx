import {PostInfoComponent} from '@components/screens/PostInfo/PostInfoComponent';
import {PanelHeaderToBack} from '@components/UI/PanelHeader';
import {PostFocusType} from '@components/UI/Post/types/post.focus.type';
import {useParams} from '@itznevikat/router';
import {PanelInterface} from '@routes/interface/panel.interface';
import {Panel} from '@vkontakte/vkui';
import {FC, memo, useLayoutEffect, useState} from 'react';

const PostInfoPage: FC<PanelInterface> = memo(({ nav }) => {
  const { hash, focus = 'wall' } = useParams<{
    hash: string;
    focus: PostFocusType;
  }>();

  const [saveHash, setSaveHas] = useState('');

  useLayoutEffect(() => {
    if (hash) setSaveHas(hash);
  }, [hash]);

  if (!saveHash) return <div>не передан hash поста</div>;
  return (
    <>
      <Panel nav={nav}>
        <PanelHeaderToBack name="Запись" />
        <PostInfoComponent hash={saveHash} focus={focus} />
      </Panel>
    </>
  );
});

export default PostInfoPage;
