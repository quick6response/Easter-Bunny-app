import { axiosInstance } from '@api/axios.instance';
import { CommentsGetInterface } from '@api/posts/types/comments.get.interface';
import { CommentsResponseInterface } from '@api/posts/types/comments.response.interface';
import { PostCreateInterface } from '@api/posts/types/post.create.interface';
import { IRequest } from '@api/types/request.types';
import { PostLikesModel, PostModel, PostReportModel } from '@models/post.model';
import { AxiosResponse } from 'axios';

export const PostApi = {
  create: async (dto: PostCreateInterface) => {
    const create = await axiosInstance.post<
      PostCreateInterface,
      AxiosResponse<IRequest<PostModel>>
    >('/walls/create', dto);

    return create.data.data;
  },

  /**
   * Видимо пока нельзя удалить
   * @param hash
   */
  delete: async (hash: string) => {
    const deletePost = await axiosInstance.delete('');
  },

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

  getComments: async (hash: string | undefined, dto: CommentsGetInterface) => {
    const getComment = await axiosInstance.get<
      IRequest<CommentsResponseInterface>
    >(`/walls/${hash}/comments`, { params: dto });

    return getComment.data.data;
  },

  sendReport: async (hash: string) => {
    const reportPost = await axiosInstance.post<IRequest<PostReportModel>>(
      `/walls/${hash}/report`,
    );

    return reportPost.data.data;
  },
};
