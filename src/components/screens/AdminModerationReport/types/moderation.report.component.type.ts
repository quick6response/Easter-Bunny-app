import { ReportSendInterface } from '@api/report/types/report.send.interface';
import { ModerationReportType } from '@components/screens/AdminModerationReport/types/moderation.report.type';

export interface ModerationReportComponentType {
  onClickButton: (dto: ModerationReportType) => Promise<boolean>;
  type: ReportSendInterface['type'];
}
