import { PanelHeaderEgg } from '@components/UI/PanelHeader/PanelHeaderEgg';
import {
  Button,
  ButtonGroup,
  CellButton,
  Group,
  Image,
  List,
} from '@vkontakte/vkui';
import { FC } from 'react';
import { fakePost } from '../../../fakeData/fake.post';

export const HomeComponent: FC = () => {
  const getPost = fakePost;

  return (
    <>
      <PanelHeaderEgg name={'Главная'} />
      <List>
        {getPost.map((post) => (
          <Group key={post.id}>
            <Image
              src={post.photo.url}
              width={post.photo.width}
              height={post.photo.height}
              style={{
                minHeight: '30lvi',
                minWidth: '50lvi',
              }}
            ></Image>
            <div>{post.text}</div>
            <ButtonGroup mode="horizontal">
              <Button>Лайк</Button>
              <CellButton>Комментарии</CellButton>
              <CellButton>Поделиться</CellButton>
            </ButtonGroup>
          </Group>
        ))}
      </List>
    </>
  );
};
