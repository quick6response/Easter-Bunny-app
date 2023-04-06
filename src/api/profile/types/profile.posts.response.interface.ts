import { PostResponseInterface } from '@api/posts/types/post.response.interface';

export type ProfilePostsResponseInterface = Omit<
  PostResponseInterface,
  'last_date'
>;
