import { CommentModel } from '@models/comment.model';
import { PostCommentsModel } from '@models/post.model';

export interface CommentsResponseInterface extends PostCommentsModel {
  // всего комментов существует к посту
  all: number;
  // смещение (параметр из GET)
  offset: number;
  items: CommentModel[];
}
