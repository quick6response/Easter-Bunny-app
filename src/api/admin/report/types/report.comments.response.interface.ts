import { ReportResponseInterface } from '@api/admin/report/types/report.response.interface';
import { CommentModel } from '@models/comment.model';

export type ReportCommentsResponseInterface = ReportResponseInterface<
  ReportCommentModel[]
>;

export interface ReportCommentModel {
  id: number;
  vk_id: number;
  status: number;
  date: string;
  type: 'comment';
  text: string;
  comment_id: number;
  comment: CommentModel;
}
