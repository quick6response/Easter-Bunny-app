import {PostApi} from '@api/posts/post.api';
import {PostResponseInterface} from '@api/posts/types/post.response.interface';
import {useAppSelector} from '@hooks/useAppSelector';
import {InfiniteData, useMutation, useQueryClient,} from '@tanstack/react-query';

export const useDeletePost = () => {
  const queryClient = useQueryClient();
  const tabActive = useAppSelector((state) => state.wallPanel.tab);
  return useMutation({
    mutationFn: (hash: string) => PostApi.delete(hash),
    onSuccess: async (data, variables) => {
      queryClient.removeQueries(['post', variables]);
      // await queryClient.invalidateQueries(['my', 'profile', 'posts']);
      const deletePostWall = (object: InfiniteData<PostResponseInterface>) => {
        if (object?.pages) {
          for (const page of object.pages) {
            page.items = page.items.filter((item) => item.hash !== variables);
            page.count -= 1;
            page.all -= 1;
          }
        }
        return object;
      };

      queryClient.setQueryData<InfiniteData<PostResponseInterface>>(
        ['my', 'profile', 'posts'],
        (oldData) => {
          return oldData ? structuredClone(deletePostWall(oldData)) : oldData;
        },
        { updatedAt: Date.now() },
      );
      queryClient.setQueryData<InfiniteData<PostResponseInterface>>(
        ['wall', tabActive],
        (oldData) => {
          return oldData ? structuredClone(deletePostWall(oldData)) : oldData;
        },
        { updatedAt: Date.now() },
      );
    },
  });
};
