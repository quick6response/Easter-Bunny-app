import { PostModel } from '@models/post.model';
import { FC } from 'react';

export const PostInfoComponent: FC<PostModel> = ({
  id,
  hash,
  user_id,
  photo,
  text,
  date_create,
  likes,
  date_update,
  comments,
}) => {
  return <div>Вот инфа о {hash}</div>;
};
