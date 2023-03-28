import { PostsComponent } from '@components/UI/Post/PostsComponent';
import { PostModel } from '@models/post.model';
import { urlService } from '@services/link/url.service';
import { Icon24Like } from '@vkontakte/icons';
import {
  Avatar,
  Gradient,
  Group,
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
      {/*<Group separator="hide">*/}
      {/*  <Tabs mode="secondary">*/}
      {/*    <HorizontalScroll arrowSize="m">*/}
      {/*      <TabsItem selected>Все</TabsItem>*/}
      {/*      <TabsItem>Закрепленные</TabsItem>*/}
      {/*    </HorizontalScroll>*/}
      {/*  </Tabs>*/}
      {/*</Group>*/}

      <PostsComponent posts={fakePost} isForTopChildren>
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
