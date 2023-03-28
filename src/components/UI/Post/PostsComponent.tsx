import { PostComponent } from '@components/UI/Post/PostComponent';
import { PostModel } from '@models/post.model';
import { utilsService } from '@services/utils/utils.service';
import { Icon24Note } from '@vkontakte/icons';
import { Footer, Group, List, Placeholder } from '@vkontakte/vkui';
import { clsx } from 'clsx';
import { FC, PropsWithChildren } from 'react';
import styles from './post.module.css';

interface IPostsComponent {
  posts: PostModel[];
  isForTopChildren?: boolean;
}

export const PostsComponent: FC<PropsWithChildren<IPostsComponent>> = ({
  posts,
  isForTopChildren = false,
  children,
}) => {
  const GroupComponent: FC<
    PropsWithChildren<{ id: number; index: number }>
  > = ({ id, index, children: postComponent }) => {
    return (
      <Group
        key={id}
        id={String(id)}
        className={clsx(styles.group)}
        style={{
          cursor: 'pointer',
          zIndex: 2,
        }}
        separator="auto"
        header={isForTopChildren && index === 0 && children}
      >
        {postComponent}
      </Group>
    );
  };

  return (
    <>
      {posts?.length ? (
        <>
          <List>
            {posts.map((post, index) => (
              <Group
                key={post.id}
                className={clsx(styles.group)}
                style={{
                  cursor: 'pointer',
                  zIndex: 2,
                }}
                separator="auto"
                header={isForTopChildren && index === 0 && children}
              >
                <>
                  <PostComponent key={post.id} {...post} />
                </>
              </Group>
            ))}
          </List>
          <Footer>
            {utilsService.declOfNum(posts.length, ['пост', 'поста', 'постов'])}
          </Footer>
        </>
      ) : (
        <GroupComponent id={0} index={0}>
          <Placeholder stretched icon={<Icon24Note />}>
            Записей пока нет
          </Placeholder>
        </GroupComponent>
      )}
    </>
  );
};
