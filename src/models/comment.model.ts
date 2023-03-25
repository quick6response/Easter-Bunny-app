import { UserModel } from '@models/user.model';

export interface CommentModel {
  id: number;
  // автор комментария
  id_vk: number;
  // дата публикации комментария
  date: string;
  // текст комментария
  text: string;

  user: UserModel;
}
