import { PostApi } from '@api/posts/post.api';
import { PostResponseInterface } from '@api/posts/types/post.response.interface';
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export const useSetLikePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (hash: string) => PostApi.setLike(hash),
    onSuccess: async (data, variables, context) => {
      queryClient.setQueryData(
        ['posts'],
        (oldData: InfiniteData<PostResponseInterface> | undefined) => {
          const findPostPage = oldData?.pages.find((postPage) =>
            postPage?.items?.find((post) => post.hash === variables),
          );
          if (!findPostPage) return oldData;
          const findPost = findPostPage?.items.find(
            ({ hash }) => hash === variables,
          );
          if (!findPost) return oldData;
          findPost.likes = { count: data.count, user_likes: data.user_likes };

          return oldData ? { ...oldData } : oldData;
        },
      );
    },
  });
};
