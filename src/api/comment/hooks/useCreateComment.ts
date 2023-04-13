import { CommentApi } from '@api/comment/comment.api';
import { CommentCreateInterface } from '@api/posts/types/comment.create.interface';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateComment = (hash?: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CommentCreateInterface) => CommentApi.create(dto),
    onSuccess: async () => {
      // queryClient.setQueryData<InfiniteData<CommentsResponseInterface>>(
      //   ['posts', hash, 'comments'],
      //   (oldData) => {
      //     return oldData ? {...oldData.}
      //   },
      // );
      await queryClient.invalidateQueries(['post', hash, 'comments']);
    },
  });
};
