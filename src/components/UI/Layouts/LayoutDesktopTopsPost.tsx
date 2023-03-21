import {
  Avatar,
  CellButton,
  Group,
  List,
  Subhead,
  useAdaptivityConditionalRender,
} from '@vkontakte/vkui';
import { FC } from 'react';
import { fakePost } from '../../../fakeData/fake.post';

const LayoutDesktopTopsPost: FC = () => {
  const { viewWidth } = useAdaptivityConditionalRender();
  const getPopularPost = fakePost;

  return (
    <Group header={<Subhead>Популярные посты за сегодня </Subhead>}>
      <List>
        {getPopularPost.map((post) => (
          <CellButton
            key={post.id}
            before={<Avatar src={post.photo.url}> </Avatar>}
          >
            {post.text}
          </CellButton>
        ))}
      </List>
    </Group>
  );
};

export default LayoutDesktopTopsPost;
