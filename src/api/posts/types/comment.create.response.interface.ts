import { CommentModel } from '@models/comment.model';
import { PostCommentsModel } from '@models/post.model';

export interface CommentCreateResponseInterface extends PostCommentsModel {
  items: CommentModel[];
}
