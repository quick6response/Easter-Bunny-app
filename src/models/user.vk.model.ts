import { UserInfo } from '@vkontakte/vk-bridge';

export interface UserVkModel
  extends Pick<UserInfo, 'first_name' | 'last_name' | 'id' | 'sex'> {
  photo: string;
}
