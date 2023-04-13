import { AdminReportApi } from '@api/admin/report/admin.report.api';
import { PostResponseInterface } from '@api/posts/types/post.response.interface';
import { ReportSendInterface } from '@api/report/types/report.send.interface';
import { ModerationReportType } from '@components/screens/AdminModerationReport/types/moderation.report.type';
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export const useReplyAdminReport = (tab: ReportSendInterface['type']) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: ModerationReportType) => AdminReportApi.replyReport(dto),

    // TODO: Убралить репорт из списка
    onSuccess: async (data, variables, context) => {
      const deletePostWall = (object: InfiniteData<PostResponseInterface>) => {
        if (object?.pages) {
          for (const page of object.pages) {
            page.items = page.items.filter((item) => item.id !== variables.id);
            page.count -= 1;
            page.all -= 1;
          }
        }
        return object;
      };

      queryClient.setQueryData<InfiniteData<PostResponseInterface>>(
        ['admin', 'reports', tab],
        (oldData) => {
          return oldData ? structuredClone(deletePostWall(oldData)) : oldData;
        },
        { updatedAt: Date.now() },
      );
    },
  });
};
