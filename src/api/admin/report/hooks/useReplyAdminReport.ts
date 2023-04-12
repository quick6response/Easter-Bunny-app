import { AdminReportApi } from '@api/admin/report/admin.report.api';
import { ReportSendInterface } from '@api/report/types/report.send.interface';
import { ModerationReportType } from '@components/screens/AdminModerationReport/types/moderation.report.type';
import { useMutation } from '@tanstack/react-query';

export const useReplyAdminReport = (tab: ReportSendInterface['type']) => {
  return useMutation({
    mutationFn: (dto: ModerationReportType) => AdminReportApi.replyReport(dto),

    // TODO: Убралить репорт из списка
    onSuccess: async (data, variables, context) => {},
  });
};
