import { AdminReportApi } from '@api/admin/report/admin.report.api';
import { ReportSendInterface } from '@api/report/types/report.send.interface';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

const LIMIT_DATA = 20;
export const useGetAdminReportsPhotos = (type: ReportSendInterface['type']) => {
  const queryClient = useQueryClient();
  return useInfiniteQuery({
    queryKey: ['admin', 'reports', type],
    queryFn: ({ pageParam }) =>
      AdminReportApi.getListPhoto({
        offset: pageParam?.nextOffset,
        count: 20,
        type,
      }),
    enabled: type !== 'photos',
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    getNextPageParam: (lastPage) => {
      if (lastPage.items.length === 0) return null;
      const nextOffset =
        lastPage?.count === LIMIT_DATA ? lastPage?.offset + LIMIT_DATA : null;
      if (!nextOffset) return null;
      return { nextOffset };
    },
  });
};
