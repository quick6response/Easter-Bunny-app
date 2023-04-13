import { axiosInstance } from '@api/axios.instance';
import { WallGetInterface } from '@api/posts/types/post.get.interface';
import { PostResponseInterface } from '@api/posts/types/post.response.interface';
import { IRequest } from '@api/types/request.types';
import { AxiosResponse } from 'axios';

export const WallApi = {
  getPosts: async (dto: WallGetInterface) => {
    if (!dto?.last_date) dto.last_date = '0';
    if (!dto?.offset) dto.offset = 0;
    if (!dto?.tab) dto.tab = 'all';

    const response = await axiosInstance.get<
      WallGetInterface,
      AxiosResponse<IRequest<PostResponseInterface>>
    >(`/walls/${dto.tab === 'all' ? '' : dto.tab}`, {
      params: dto,
    });

    return response.data.data;
  },
};
