import { PostAttachmentModel } from '@models/post.model';

export interface PhotoCreateInterface
  extends Omit<PostAttachmentModel, 'url' | 'id' | 'date' | ''> {
  hash: string;
}
