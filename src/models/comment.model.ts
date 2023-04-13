import { UserVkModel } from '@models/user.vk.model';

export interface CommentModel {
  id: number;
  // автор комментария
  vk_id: number;
  // дата публикации комментария
  date: string;
  // текст комментария
  text: string;

  user: Omit<UserVkModel, 'id'>;
}
