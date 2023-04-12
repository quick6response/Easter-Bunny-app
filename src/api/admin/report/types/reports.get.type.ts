import { WallGetInterface } from '@api/posts/types/post.get.interface';
import { ReportSendInterface } from '@api/report/types/report.send.interface';

export type ReportsGetType = {
  type: ReportSendInterface['type'];
} & Pick<WallGetInterface, 'offset' | 'count'>;
