import { axiosInstance } from '@api/axios.instance';
import { IRequest } from '@api/types/request.types';
import { PostReportModel } from '@models/post.model';

export const ReportApi = {
  photo: async (photoId: string | number) => {
    const reportPhoto = await axiosInstance.post<IRequest<PostReportModel>>(
      `/photos/${photoId}/report`,
    );

    return reportPhoto.data.data;
  },

  post: async (hash: string | number) => {
    const reportPost = await axiosInstance.post<IRequest<PostReportModel>>(
      `/walls/${hash}/report`,
    );

    return reportPost.data.data;
  },

  comment: async (commentId: string | number) => {
    const reportPost = await axiosInstance.post<IRequest<PostReportModel>>(
      `/comments/${commentId}/report`,
    );

    return reportPost.data.data;
  },
};
