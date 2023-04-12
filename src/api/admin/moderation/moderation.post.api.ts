import { ModerationWallType } from '@api/admin/moderation/types/moderation.wall.type';
import { axiosInstance } from '@api/axios.instance';
import { PostCreateInterface } from '@api/posts/types/post.create.interface';
import { WallGetInterface } from '@api/posts/types/post.get.interface';
import { PostResponseInterface } from '@api/posts/types/post.response.interface';
import { IRequest } from '@api/types/request.types';
import { AxiosResponse } from 'axios';

export const ModerationPostApi = {
  getWall: async (dto: Partial<Pick<WallGetInterface, 'offset' | 'count'>>) => {
    if (!dto?.count) dto.count = 20;
    if (!dto?.offset) dto.offset = 0;

    const getWall = await axiosInstance.get<IRequest<PostResponseInterface>>(
      '/moderation/walls',
      {
        params: {
          count: dto?.count,
          offset: dto?.offset,
        },
      },
    );

    return getWall.data.data;
  },

  voteModeration: async (dto: ModerationWallType) => {
    const vote = await axiosInstance.put<
      { status: boolean },
      AxiosResponse<IRequest<PostCreateInterface>>
    >(`/moderation/walls/${dto.hash}`, {
      status: dto.status,
    });

    return vote.data.data;
  },
};
