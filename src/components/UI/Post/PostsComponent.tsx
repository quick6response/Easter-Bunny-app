import { PostComponent } from '@components/UI/Post/PostComponent';
import { PostModel } from '@models/post.model';
import { utilsService } from '@services/utils/utils.service';
import { Icon24Note } from '@vkontakte/icons';
import { Footer, Group, List, Placeholder, Spinner } from '@vkontakte/vkui';
import { clsx } from 'clsx';
import { FC, memo, PropsWithChildren, ReactNode } from 'react';
import styles from './post.module.css';

interface IPostsComponent {
  isLoading: boolean;
  isForTopChildren?: boolean;
  posts: PostModel[];
  bottom?: ReactNode;
}

export const PostsComponent: FC<PropsWithChildren<IPostsComponent>> = memo(
  ({ posts, isForTopChildren = false, children, isLoading, bottom }) => {
    if (isLoading)
      return (
        <Group>
          <Placeholder icon={<Spinner />}>Загружаем записей...</Placeholder>
        </Group>
      );

    return (
      <>
        {posts?.length > 0 && posts[0] !== undefined ? (
          <>
            <List>
              {posts.map((post, index) =>
                post ? (
                  <Group key={post?.id}>
                    <>
                      <div>{isForTopChildren && index === 0 && children}</div>
                      <PostComponent key={post.id} post={post} />
                    </>
                  </Group>
                ) : (
                  <Placeholder key={index}>
                    Что-то пошло не так. Не удалось получить записи
                  </Placeholder>
                ),
              )}
            </List>
            {bottom}
            <Footer>
              {utilsService.declOfNum(posts.length, [
                'пост',
                'поста',
                'постов',
              ])}
            </Footer>
          </>
        ) : (
          <Group
            className={clsx(styles.group)}
            separator="auto"
            header={isForTopChildren && children}
          >
            <Placeholder icon={<Icon24Note />}>Записей пока нет</Placeholder>
          </Group>
        )}
      </>
    );
  },
);
