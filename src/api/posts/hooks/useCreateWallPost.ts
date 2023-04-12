import { PostApi } from '@api/posts/post.api';
import { PostCreateInterface } from '@api/posts/types/post.create.interface';
import { useAction } from '@hooks/useActions';
import { postCreateActions } from '@store/post/post.create.slice';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateWallPost = () => {
  const postCreateAction = useAction(postCreateActions);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (dto: PostCreateInterface) => PostApi.create(dto),
    onSuccess: async (data) => {
      postCreateAction.reset();
    },
  });
};
