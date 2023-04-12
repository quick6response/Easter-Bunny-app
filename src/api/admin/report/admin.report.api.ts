import { ReportCommentsResponseInterface } from '@api/admin/report/types/report.comments.response.interface';
import { ReportPhotosResponseInterface } from '@api/admin/report/types/report.photos.response.interface';
import { ReportPostsResponseInterface } from '@api/admin/report/types/report.posts.response.interface';
import { ReportsGetType } from '@api/admin/report/types/reports.get.type';
import { axiosInstance } from '@api/axios.instance';
import { IRequest } from '@api/types/request.types';
import { ModerationReportType } from '@components/screens/AdminModerationReport/types/moderation.report.type';
import { AxiosResponse } from 'axios';

export const AdminReportApi = {
  // Получение записей по категориям
  getListPost: async (dto: ReportsGetType) => {
    if (!dto?.count) dto.count = 20;
    if (!dto?.offset) dto.offset = 0;

    const getListReport = await axiosInstance.get<
      IRequest<ReportPostsResponseInterface>
    >(`/reports/walls`, {
      params: {
        count: dto.count,
        offset: dto.offset,
      },
    });

    return getListReport.data.data;
  },

  getListPhoto: async (dto: ReportsGetType) => {
    if (!dto?.count) dto.count = 20;
    if (!dto?.offset) dto.offset = 0;

    const getListReport = await axiosInstance.get<
      IRequest<ReportPhotosResponseInterface>
    >(`/reports/photos`, {
      params: {
        count: dto.count,
        offset: dto.offset,
      },
    });
    return getListReport.data.data;
  },

  getListComment: async (dto: ReportsGetType) => {
    if (!dto?.count) dto.count = 20;
    if (!dto?.offset) dto.offset = 0;

    const getListReport = await axiosInstance.get<
      IRequest<ReportCommentsResponseInterface>
    >(`/reports/comments`, {
      params: {
        count: dto.count,
        offset: dto.offset,
      },
    });

    return getListReport.data.data;
  },

  replyReport: async (dto: ModerationReportType) => {
    const reply = await axiosInstance.put<
      ModerationReportType,
      AxiosResponse<IRequest<ModerationReportType>>
    >(`/reports/${dto.id}`, dto);

    return reply.data.data;
  },
};
