import { PostComponent } from '@components/UI/Post/PostComponent';
import { PostModel } from '@models/post.model';
import { utilsService } from '@services/utils/utils.service';
import { Icon24Note } from '@vkontakte/icons';
import { Footer, Group, List, Placeholder } from '@vkontakte/vkui';
import { clsx } from 'clsx';
import { FC, memo, PropsWithChildren } from 'react';
import styles from './post.module.css';

interface IPostsComponent {
  isForTopChildren?: boolean;
  posts: PostModel[];
  countPosts: number;
}

export const PostsComponent: FC<PropsWithChildren<IPostsComponent>> = memo(
  ({ posts, isForTopChildren = false, children, countPosts }) => {
    return (
      <>
        {posts?.length > 0 ? (
          <>
            <List>
              {posts.map((post, index) => (
                <Group
                  key={post.id}
                  className={clsx(styles.group)}
                  style={{
                    cursor: 'pointer',
                  }}
                >
                  <>
                    <div>{isForTopChildren && index === 0 && children}</div>
                    <PostComponent key={post.id} post={post} />
                  </>
                </Group>
              ))}
            </List>
            <Footer>
              {utilsService.declOfNum(countPosts, ['пост', 'поста', 'постов'])}
            </Footer>
          </>
        ) : (
          <Group
            className={clsx(styles.group)}
            style={{
              cursor: 'pointer',
              zIndex: 2,
            }}
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
