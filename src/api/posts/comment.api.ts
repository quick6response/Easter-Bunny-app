import { axiosInstance } from '@api/axios.instance';
import { CommentCreateInterface } from '@api/posts/types/comment.create.interface';
import { CommentCreateResponseInterface } from '@api/posts/types/comment.create.response.interface';
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
};
