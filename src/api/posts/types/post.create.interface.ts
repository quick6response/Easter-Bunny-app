import { PostModel } from '@models/post.model';

export interface PostCreateInterface extends Partial<Pick<PostModel, 'text'>> {
  /**
   * Хеш
   */
  photo: string;
}
