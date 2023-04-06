import { UserModel } from '@models/user.model';

export interface PostModel {
  id: number;
  vk_id: number;
  hash: string; // хеш, по которому можно будет найти пост
  text: string; // текст поста
  date_create: string; // дата создания поста
  date_update: string; // дата редактироания поста
  user: UserModel;
  photo: PostAttachmentModel;
  likes: PostLikesModel;
  comments: PostCommentsModel;
  pin?: PostPinModel;
}

export interface PostPinModel {
  start: string;
  end: string;
  forever: number;
}

export interface PostCommentsModel {
  count: number;
  user_comments: boolean;
}

export interface PostAttachmentModel {
  id: number;
  url: string; // ссылка на картинку
  height: number; // высота
  width: number; // ширина
  size: number; // вес фото в байтах
  ext: string; // тип фото
  date: string; // дата загрузки
}

export interface PostLikesModel {
  count: number; // количество лайков
  user_likes: boolean; // оценил ли текущий пользователь пост (1 — да, 0 — нет)
  // can_like: boolean; // может ли текущий пользователь оценить пост (1 — да, 0 — нет)
}

/**
 * Жалобы
 */
export interface PostReportModel {
  id: number;
  vk_id: number;
  status: number;
  date: Date;
  type: string;
  text: string;
  wall_id: number;
}
