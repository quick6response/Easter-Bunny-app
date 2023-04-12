import { ReportResponseInterface } from '@api/admin/report/types/report.response.interface';
import { PostModel } from '@models/post.model';
import { UserVkModel } from '@models/user.vk.model';

export type ReportPostsResponseInterface = ReportResponseInterface<
  ReportPostModel[]
>;

export interface ReportPostModel {
  id: number;
  vk_id: number; // кто пожаловался
  status: number;
  date: string;
  type: 'wall'; // тип (на что пожаловались, а данном случае — содержимое записи)
  text: string; // на что пожаловались
  wall_id: number;
  wall: PostModel;
  // Автор жалобы
  user: UserVkModel;
}
