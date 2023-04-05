import { PostsComponent } from '@components/UI/Post/PostsComponent';
import { PostModel } from '@models/post.model';
import { urlService } from '@services/link/url.service';
import { Icon24Like } from '@vkontakte/icons';
import bridge from '@vkontakte/vk-bridge';
import {
  Avatar,
  Button,
  Gradient,
  Group,
  Header,
  HorizontalScroll,
  SimpleCell,
  Tabs,
  TabsItem,
  Title,
  usePlatform,
} from '@vkontakte/vkui';
import { Platform } from '@vkontakte/vkui/dist/lib/platform';
import { clsx } from 'clsx';
import { FC } from 'react';
import { fakePost } from '../../../fakeData/fake.post';
import styles from './profile.module.css';

interface IProfileComponent {
  firstName: string;
  lastName: string;
  photo: string;
  id: number;
  posts: PostModel[];
}

export const ProfileComponent: FC<IProfileComponent> = ({
  id,
  lastName,
  firstName,
  photo,
}) => {
  const platform = usePlatform();

  const onClickButtonPayItem = (itemId: number) => {
    bridge
      .send('VKWebAppShowOrderBox', {
        type: 'item', // Всегда должно быть 'item'
        item: `pin_${itemId}`, // Идентификатор товара
      })
      .then((data) => {
        console.log('Покупка состоялась.', data);
      })
      .catch((error) => {
        console.log('Ошибка!', error);
      });
  };

  return (
    <>
      <Group>
        <Gradient
          className={clsx(
            styles.Gradient,
            platform === Platform.VKCOM && styles.Gradient__desktop,
          )}
        >
          <Avatar
            src={photo}
            size={96}
            onClick={() => urlService.openTab(`https://vk.com/id${id}`)}
          />
          <Title className={styles.Gradient_Title} level="2" weight="2">
            {!photo && 'Загрузка...'}
            {firstName} {lastName}
          </Title>

          <SimpleCell disabled before={<Icon24Like />} style={{}}>
            Cобрано: {10} лайков
          </SimpleCell>
        </Gradient>
      </Group>
      <Group header={<Header>Тестовые платежи</Header>}>
        {[1, 2, 24, 365].map((number) => (
          <Button onClick={() => onClickButtonPayItem(number)}>
            Товар {number}
          </Button>
        ))}
      </Group>
      <PostsComponent
        posts={fakePost}
        isForTopChildren
        countPosts={fakePost.length}
      >
        <Tabs mode="secondary">
          <HorizontalScroll arrowSize="m">
            <TabsItem selected>Все</TabsItem>
            <TabsItem>Закрепленные</TabsItem>
          </HorizontalScroll>
        </Tabs>
      </PostsComponent>
    </>
  );
};
