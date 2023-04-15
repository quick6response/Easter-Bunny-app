import { axiosInstance } from '@api/axios.instance';
import { CommentCreateInterface } from '@api/posts/types/comment.create.interface';
import { CommentCreateResponseInterface } from '@api/posts/types/comment.create.response.interface';
import { CommentsGetInterface } from '@api/posts/types/comments.get.interface';
import { CommentsResponseInterface } from '@api/posts/types/comments.response.interface';
import { IRequest } from '@api/types/request.types';
import { AxiosResponse } from 'axios';

export const CommentApi = {
  create: async (dto: CommentCreateInterface) => {
    const sendComment = await axiosInstance.post<
      Omit<CommentCreateInterface, 'hash'>,
      AxiosResponse<IRequest<CommentCreateResponseInterface>>
    >(`/walls/${dto.hash}/comment`, { text: dto.text });

    return sendComment.data.data;
  },

  delete: async (commentId: number) => {
    const deleteComment = await axiosInstance.delete<
      IRequest<{ id: number; ok: boolean }>
    >(`comments/${commentId}`);

    return deleteComment.data.data;
  },

  getComments: async (hash: string | undefined, dto: CommentsGetInterface) => {
    const getComment = await axiosInstance.get<
      IRequest<CommentsResponseInterface>
    >(`/walls/${hash}/comments`, { params: dto });

    return getComment.data.data;
  },
};
