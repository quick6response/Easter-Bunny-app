import { useGetPostInfo } from '@api/posts/hooks/useGetPostInfo';
import { PanelHeaderToBack } from '@components/UI/PanelHeader';
import { PostComponent } from '@components/UI/Post/PostComponent';
import { useParams } from '@itznevikat/router';
import { PanelInterface } from '@routes/interface/panel.interface';
import { errorTransformService } from '@services/error/errorTransform.service';
import { Icon36IncognitoOutline } from '@vkontakte/icons';
import { Group, Panel, Placeholder, ScreenSpinner } from '@vkontakte/vkui';
import { FC } from 'react';

const PostInfoPage: FC<PanelInterface> = ({ nav }) => {
  const { hash } = useParams<{ hash: string }>();
  const { isLoading, isError, data, error } = useGetPostInfo(hash);

  if (isLoading)
    return (
      <Group>
        <ScreenSpinner></ScreenSpinner>
      </Group>
    );
  if (isError)
    return (
      <Group>
        <Placeholder icon={<Icon36IncognitoOutline />}>
          {errorTransformService.getMessageError(error)}
        </Placeholder>
      </Group>
    );

  return (
    <>
      <Panel nav={nav}>
        <PanelHeaderToBack name={'Запись'} />
        <Group>
          <PostComponent post={data} />
        </Group>
      </Panel>
    </>
  );
};

export default PostInfoPage;
