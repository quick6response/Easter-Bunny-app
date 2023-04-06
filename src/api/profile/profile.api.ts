import { axiosInstance } from '@api/axios.instance';
import { WallGetInterface } from '@api/posts/types/post.get.interface';
import { ProfilePostsResponseInterface } from '@api/profile/types/profile.posts.response.interface';
import { IRequest } from '@api/types/request.types';

export const ProfileApi = {
  getPosts: async (dto: Pick<WallGetInterface, 'count' | 'offset'>) => {
    if (!dto?.offset) dto.offset = 0;
    if (!dto?.count) dto.count = 20;

    const get = await axiosInstance.get<
      IRequest<ProfilePostsResponseInterface>
    >('/profile/walls', {
      params: dto,
    });

    return get.data.data;
  },

  getCountLikes: async () => {
    const getLikes = await axiosInstance.get<IRequest<{ count: number }>>(
      '/profile/likes',
    );

    return getLikes.data.data;
  },
};
