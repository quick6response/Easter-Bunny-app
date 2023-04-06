import { PostGetInterface } from '@api/posts/types/post.get.interface';

export type CommentsGetInterface = Omit<PostGetInterface, 'last_date'>;
