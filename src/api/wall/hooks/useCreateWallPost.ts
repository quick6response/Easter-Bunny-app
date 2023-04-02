import { PostCreateInterface } from '@api/wall/types/post.create.interface';
import { WallApi } from '@api/wall/wall.api';
import { useMutation } from '@tanstack/react-query';

export const useCreateWallPost = () => {
  return useMutation({
    mutationFn: (dto: PostCreateInterface) => WallApi.create(dto),
  });
};
