import { WallApi } from '@api/posts/wall.api';
import { useQuery } from '@tanstack/react-query';
import {
  Avatar,
  CellButton,
  Div,
  Group,
  List,
  Placeholder,
  Spinner,
  useAdaptivityConditionalRender,
} from '@vkontakte/vkui';
import { FC } from 'react';

const LayoutDesktopTopsPost: FC = () => {
  const { viewWidth } = useAdaptivityConditionalRender();
  const { isLoading, isError, data, isSuccess } = useQuery({
    queryKey: ['wall', 'lay', 'pin'],
    queryFn: () =>
      WallApi.getPosts({ tab: 'pin', count: 5, offset: 0, last_date: '0' }),
  });

  return (
    <Group header={<Div>Закрепленные записи</Div>}>
      {isLoading && <Spinner></Spinner>}
      {isError && <Placeholder>Ошибка получения постов</Placeholder>}
      {isSuccess && (
        <List>
          {data?.items.map((post) => (
            <CellButton
              key={post.id}
              before={<Avatar size={48} src={post.photo.url}></Avatar>}
            >
              {post.user.first_name} {post.user.last_name}
            </CellButton>
          ))}
        </List>
      )}
    </Group>
  );
};

export default LayoutDesktopTopsPost;
