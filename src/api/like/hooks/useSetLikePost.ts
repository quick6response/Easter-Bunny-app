import { LikeApi } from '@api/like/like.api';
import { PostResponseInterface } from '@api/posts/types/post.response.interface';
import { useAppSelector } from '@hooks/useAppSelector';
import { PostModel } from '@models/post.model';
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export const useSetLikePost = () => {
  const tabActive = useAppSelector((state) => state.wallPanel.tab);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (hash: string) => LikeApi.setLike(hash),
    onSuccess: async (data, variables, context) => {
      queryClient.setQueryData(
        ['wall', tabActive],
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
      queryClient.setQueryData<PostModel>(['post', variables], (oldData) => {
        return oldData ? { ...oldData, likes: data } : oldData;
      });
    },
  });
};
