import { ReportApi } from '@api/report/report.api';
import { ReportSendInterface } from '@api/report/types/report.send.interface';
import { useMutation } from '@tanstack/react-query';

export const useSendRepost = () => {
  return useMutation({
    mutationFn: (dto: ReportSendInterface) => {
      return dto.type === 'walls'
        ? ReportApi.post(dto.id)
        : ReportApi.photo(dto.id);
    },
  });
};
