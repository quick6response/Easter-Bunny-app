import { axiosInstance } from '@api/axios.instance';
import { IRequest } from '@api/types/request.types';
import { PostReportModel } from '@models/post.model';

export const ReportApi = {
  photo: async (photoId: string) => {
    const reportPost = await axiosInstance.post<IRequest<PostReportModel>>(
      `/photos/${photoId}/report`,
    );

    return reportPost.data.data;
  },
  post: async (hash: string) => {
    const reportPost = await axiosInstance.post<IRequest<PostReportModel>>(
      `/walls/${hash}/report`,
    );

    return reportPost.data.data;
  },
};
