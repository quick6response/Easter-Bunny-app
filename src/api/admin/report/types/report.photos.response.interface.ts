import { ReportResponseInterface } from '@api/admin/report/types/report.response.interface';
import { PostModel } from '@models/post.model';
import { UserVkModel } from '@models/user.vk.model';

export type ReportPhotosResponseInterface = ReportResponseInterface<
  ReportPhotos[]
>;

export interface ReportPhotos {
  id: number;
  vk_id: number; // автор жалобы
  status: number;
  date: string;
  type: 'photo';
  url: string; // ссылка на фотку, на которую пожаловались
  photo_id: number;
  wall: PostModel;
  // Автор жалобы
  user: UserVkModel;
}
