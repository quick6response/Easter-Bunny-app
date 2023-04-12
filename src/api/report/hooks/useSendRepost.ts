import { ReportApi } from '@api/report/report.api';
import { ReportSendInterface } from '@api/report/types/report.send.interface';
import { useMutation } from '@tanstack/react-query';

export const useSendRepost = () => {
  return useMutation({
    mutationFn: (dto: ReportSendInterface) => {
      if (dto.type === 'walls') return ReportApi.post(dto.id);
      if (dto.type === 'photos') return ReportApi.photo(dto.id);
      if (dto.type === 'comments') return ReportApi.comment(dto.id);
      else throw new Error('не найден статус репорта');
    },
  });
};
