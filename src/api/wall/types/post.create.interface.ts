import { PostModel } from '@models/post.model';

export interface PostCreateInterface extends Pick<PostModel, 'text'> {
  /**
   * Хеш
   */
  photo: string;
}
