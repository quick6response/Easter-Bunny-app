import { axiosInstance } from '@api/axios.instance';
import { IRequest } from '@api/types/request.types';
import {
  PostCommentsModel,
  PostLikesModel,
  PostModel,
  PostReportModel,
} from '@models/post.model';

export const PostApi = {
  getInfo: async (hash: string) => {
    const post = await axiosInstance.get<IRequest<PostModel>>(`walls/${hash}`);
    return post.data.data;
  },

  setLike: async (hash: string) => {
    const setLike = await axiosInstance.post<IRequest<PostLikesModel>>(
      `/walls/${hash}/like`,
    );

    return setLike.data.data;
  },

  getComments: async (hash: string) => {
    const getComment = await axiosInstance.get<IRequest<PostCommentsModel>>(
      `/walls/${hash}/comment`,
    );

    return getComment.data.data;
  },

  sendReport: async (hash: string) => {
    const reportPost = await axiosInstance.post<IRequest<PostReportModel>>(
      `/walls/${hash}/report`,
    );

    return reportPost.data.data;
  },
};
