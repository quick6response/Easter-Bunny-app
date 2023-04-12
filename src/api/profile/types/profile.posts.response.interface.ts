import { PostResponseInterface } from '@api/posts/types/post.response.interface';
import { UserVkModel } from '@models/user.vk.model';

export type ProfilePostsResponseInterface = Omit<
  PostResponseInterface,
  'last_date'
> & {
  user: UserVkModel;
};
