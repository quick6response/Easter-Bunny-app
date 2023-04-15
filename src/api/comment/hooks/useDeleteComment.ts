import { CommentApi } from '@api/comment/comment.api';
import { CommentDeleteType } from '@api/comment/types/comment.delete.type';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: CommentDeleteType) => CommentApi.delete(dto.id),
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
