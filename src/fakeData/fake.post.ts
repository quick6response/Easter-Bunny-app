import { PostModel } from '@models/post.model';
import { fakeUsers } from './fake.users';

export const fakePost: PostModel[] = [
  {
    id: 1,
    vk_id: 1,
    hash: '3c860fe919a1b488e9', // хеш, по которому можно будет найти пост
    text: 'Это супер-пупер классный текст поста с лимитом в 256 символов. :) Это супер-пупер классный текст поста с лимитом в 256 символов. :)', // текст поста
    date_create: '2023-03-20 18:45:11', // дата создания поста
    date_update: '2023-03-21 19:45:11', // дата редактироания поста
    comments: {
      count: 10,
      can_comment: true,
      user_comments: false,
    },
    user: fakeUsers[0],
    photo: {
      id: 10,
      url: 'https://cdn.ithube.ru/file/eggs/101a303576df5be8be35', // ссылка на картинку
      height: 1529, // высота
      width: 1200, // ширина
      size: 112_226, // вес фото в байтах
      ext: 'jpg', // тип фото
      date: '2023-03-20 18:10:14', // дата загрузки
    },
    likes: {
      count: 0, // количество лайков
      user_likes: false,
    },
  },

  {
    id: 2,
    vk_id: 360_767_360,
    hash: '3c860fe919a1b488e231', // хеш, по которому можно будет найти пост
    text: 'Второй', // текст поста
    date_create: '2023-03-21 19:45:11', // дата создания поста
    date_update: '2023-03-21 19:45:11', // дата редактироания поста
    photo: {
      id: 10,
      url: 'https://sun1-24.userapi.com/impg/kbvkciQKPp34BgsSrsTW5UthvJXISdIHJO1Dsg/pcot-EHCInM.jpg?size=1280x720&quality=96&sign=34939c114837bcd22baf585cbfc608be&type=album', // ссылка на картинку
      height: 1529, // высота
      width: 1200, // ширина
      size: 112_226, // вес фото в байтах
      ext: 'jpg', // тип фото
      date: '2023-03-18 18:10:14', // дата загрузки
    },
    comments: {
      count: 10,
      can_comment: true,
      user_comments: false,
    },
    user: fakeUsers[0],
    likes: {
      user_likes: false,
      count: 154_545,
    },
  },
];
