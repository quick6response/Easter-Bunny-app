import { PostApi } from '@api/posts/post.api';
import { useAppSelector } from '@hooks/useAppSelector';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const tabActive = useAppSelector((state) => state.wallPanel.tab);
  return useMutation({
    mutationFn: (hash: string) => PostApi.delete(hash),
    onSuccess: async (data, variables) => {
      queryClient.removeQueries(['post', variables]);
      await queryClient.invalidateQueries(['wall', tabActive]);
    },
  });
};
