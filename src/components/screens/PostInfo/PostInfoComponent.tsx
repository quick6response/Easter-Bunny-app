import { CommentComponent } from '@components/UI/Comment/CommentComponent';
import { PostComponent } from '@components/UI/Post/PostComponent';
import { PostModel } from '@models/post.model';
import { FC } from 'react';
import { fakeComments } from '../../../fakeData/fake.comments';

export const PostInfoComponent: FC<{ post?: PostModel }> = ({ post }) => {
  if (!post) return <div>Информации о посте не найдено</div>;

  return (
    <>
      <PostComponent {...post}>
        <CommentComponent comments={fakeComments} />
      </PostComponent>
    </>
  );
};
