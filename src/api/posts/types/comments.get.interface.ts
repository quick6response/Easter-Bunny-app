import { WallGetInterface } from '@api/posts/types/post.get.interface';

export type CommentsGetInterface = Omit<WallGetInterface, 'last_date'>;
