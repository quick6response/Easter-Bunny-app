import {axiosInstance} from '@api/axios.instance';
import {PostCreateInterface} from '@api/posts/types/post.create.interface';
import {IRequest} from '@api/types/request.types';
import {PostModel} from '@models/post.model';
import {AxiosResponse} from 'axios';

export const PostApi = {
  create: async (dto: PostCreateInterface) => {
    const create = await axiosInstance.post<
      PostCreateInterface,
      AxiosResponse<IRequest<PostModel>>
    >('/walls/create', {
      photo: dto.photo,
      ...(dto.text && { text: dto.text }),
    });

    return create.data.data;
  },

  delete: async (hash: string) => {
    // const deletePost = await axiosInstance.delete<
    //   IRequest<{ id: number; ok: boolean }>
    // >(`/walls/${hash}`);
    return { id: 1, ok: true };
  },

  getInfo: async (hash: string) => {
    const post = await axiosInstance.get<IRequest<PostModel>>(`walls/${hash}`);
    return post.data.data;
  },
};
