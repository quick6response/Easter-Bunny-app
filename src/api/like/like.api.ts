import { axiosInstance } from '@api/axios.instance';
import { IRequest } from '@api/types/request.types';
import { PostLikesModel } from '@models/post.model';

export const LikeApi = {
  setLike: async (hash: string) => {
    const setLike = await axiosInstance.post<IRequest<PostLikesModel>>(
      `/walls/${hash}/like`,
    );

    return setLike.data.data;
  },
};
