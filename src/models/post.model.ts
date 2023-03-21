export interface PostModel {
  id: number;
  hash: string; // хеш, по которому можно будет найти пост
  text: string; // текст поста
  date_create: string; // дата создания поста
  date_update: string; // дата редактироания поста
  photo: PostAttachmentModel;
  likes: PostLikesModel;
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
  count: 0; // количество лайков
}
