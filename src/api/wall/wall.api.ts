import { axiosInstance } from '@api/axios.instance';
import { IRequest } from '@api/types/request.types';
import { PostGetInterface } from '@api/wall/types/post.get.interface';
import { PostResponseInterface } from '@api/wall/types/post.response.interface';
import { AxiosResponse } from 'axios';

const LIMIT_DATA = 10;
export const WallApi = {
  getPosts: async (dto: PostGetInterface) => {
    // debugger;
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
};
