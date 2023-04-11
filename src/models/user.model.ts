export interface UserModel {
  id: number;
  vk_id: number;
  last_name: string;
  first_name: string;
  photo: string;
  admin?: boolean;
}
