import { axiosInstance } from '@api/axios.instance';
import { PostCreateInterface } from '@api/posts/types/post.create.interface';
import { PostGetInterface } from '@api/posts/types/post.get.interface';
import { PostResponseInterface } from '@api/posts/types/post.response.interface';
import { IRequest } from '@api/types/request.types';
import { PostModel } from '@models/post.model';
import { AxiosResponse } from 'axios';

export const WallApi = {
  getPosts: async (dto: PostGetInterface) => {
    if (!dto?.last_date) dto.last_date = '0';
    if (!dto?.offset) dto.offset = 0;

    const response = await axiosInstance.get<
      PostGetInterface,
      AxiosResponse<IRequest<PostResponseInterface>>
    >('/walls', {
      params: dto,
    });

    return response.data.data;
  },
  create: async (dto: PostCreateInterface) => {
    const create = await axiosInstance.post<
      PostCreateInterface,
      AxiosResponse<IRequest<PostModel>>
    >('/walls/create', dto);

    return create.data.data;
  },
};
