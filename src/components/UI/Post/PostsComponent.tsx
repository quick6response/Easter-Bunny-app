import { PostComponent } from '@components/UI/Post/PostComponent';
import { PostModel } from '@models/post.model';
import { Icon24Note } from '@vkontakte/icons';
import { Group, List, Placeholder } from '@vkontakte/vkui';
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
      >
        <>
          {isForTopChildren && index === 0 && children}
          {postComponent}
        </>
      </Group>
    );
  };

  return (
    <>
      {posts?.length ? (
        <List>
          {posts.map((post, index) => (
            <GroupComponent key={post.id} id={post.id} index={index}>
              <PostComponent key={post.id} {...post} />
            </GroupComponent>
          ))}
        </List>
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
