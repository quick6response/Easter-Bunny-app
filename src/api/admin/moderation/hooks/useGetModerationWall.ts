import { ModerationPostApi } from '@api/admin/moderation/moderation.post.api';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

const LIMIT_DATA = 20;
export const useGetModerationWall = () => {
  const queryClient = useQueryClient();
  return useInfiniteQuery({
    queryKey: ['admin', 'moderation', 'wall'],
    queryFn: ({ pageParam }) => {
      return ModerationPostApi.getWall({
        offset: pageParam?.nextOffset,
        count: 20,
      });
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    onSuccess: (data) => {
      for (const postPage of data.pages) {
        for (const post of postPage.items) {
          queryClient.setQueryData(['post', post.hash], post, {
            updatedAt: Date.now(),
          });
        }
      }
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.items.length === 0) return null;
      const nextOffset =
        lastPage?.count === LIMIT_DATA ? lastPage?.offset + LIMIT_DATA : null;
      if (!nextOffset) return null;
      return { nextOffset };
    },
  });
};
