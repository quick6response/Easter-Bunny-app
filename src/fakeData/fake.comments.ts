import { CommentModel } from '@models/comment.model';
import { fakeUsers } from './fake.users';

export const fakeComments: CommentModel[] = [
  {
    // id: 1,
    // id_vk: 360_767_360,
    text: 'круто',
    date: '21.03.2023 11:13:31',
    ...fakeUsers[0],
  },
];
