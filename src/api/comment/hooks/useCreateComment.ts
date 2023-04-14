import { CommentApi } from '@api/comment/comment.api';
import { CommentCreateInterface } from '@api/posts/types/comment.create.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CommentCreateInterface) => CommentApi.create(dto),
    onSuccess: async (data, variables, context) => {
      // queryClient.setQueryData<InfiniteData<CommentsResponseInterface>>(
      //   ['posts', hash, 'comments'],
      //   (oldData) => {
      //     return oldData ? {...oldData.}
      //   },
      // );
      await queryClient.invalidateQueries(['post', variables.hash, 'comments']);
    },
  });
};
