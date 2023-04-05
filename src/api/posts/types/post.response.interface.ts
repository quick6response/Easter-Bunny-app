import { PostModel } from '@models/post.model';

export interface PostResponseInterface {
  all: number;
  count: number;
  items: PostModel[];
  last_date: string;
  offset: number;
}
