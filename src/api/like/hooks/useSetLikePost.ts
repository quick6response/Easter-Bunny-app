import { LikeApi } from '@api/like/like.api';
import { PostResponseInterface } from '@api/posts/types/post.response.interface';
import { useAction } from '@hooks/useActions';
import { useAppSelector } from '@hooks/useAppSelector';
import { PostModel } from '@models/post.model';
import { wallPanelSliceActions } from '@store/wall/wall.panel.slice';
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

/**
 * @param vk_id То кому ставится лайк
 */
export const useSetLikePost = (vk_id: number) => {
  const userId = useAppSelector((state) => state.user.vk_id);
  const tabActive = useAppSelector((state) => state.wallPanel.tab);
  const wallAction = useAction(wallPanelSliceActions);

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (hash: string) => LikeApi.setLike(hash),
    onSuccess: async (data, variables) => {
      wallAction.plusLike();
      queryClient.setQueryData<InfiniteData<PostResponseInterface>>(
        ['wall', tabActive],
        (oldData) => {
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
      // плюсуем лайки людям
      queryClient.setQueryData<{ count: number }>(
        [vk_id === userId ? 'my' : vk_id.toString(), 'profile', 'count_like'],
        (oldData) => {
          return oldData
            ? {
                count: !data.user_likes ? oldData.count - 1 : oldData.count + 1,
              }
            : oldData;
        },
      );
    },
  });
};
