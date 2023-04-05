import { useGetPostInfo } from '@api/posts/hooks/useGetPostInfo';
import { PostComponent } from '@components/UI/Post/PostComponent';
import { errorTransformService } from '@services/error/errorTransform.service';
import { Icon36IncognitoOutline } from '@vkontakte/icons';
import { Group, Placeholder, ScreenSpinner } from '@vkontakte/vkui';
import { FC } from 'react';

export const PostInfoComponent: FC<{ hash: string }> = ({ hash }) => {
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

  if (!data) return <div>Информации о посте не найдено</div>;

  return (
    <Group>
      <PostComponent post={data}>
        {/*<CommentComponent comments={fakeComments} />*/}
      </PostComponent>
    </Group>
  );
};
