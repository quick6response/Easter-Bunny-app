import { ProfileApi } from '@api/profile/profile.api';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

export const useGetProfileUser = (userId: string) => {
  const queryClient = useQueryClient();
  return useInfiniteQuery({
    queryKey: [userId, 'profile', 'posts'],
    queryFn: ({ pageParam }) => {
      return ProfileApi.getPosts(
        {
          offset: pageParam,
          count: 20,
        },
        userId,
      );
    },
    enabled: !!userId,
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    retry: 2,
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
      if (lastPage?.count === lastPage?.all) return null;
      const nextOffset =
        lastPage?.count !== lastPage?.offset
          ? lastPage?.offset + lastPage?.count
          : null;
      if (!nextOffset) return null;
      return nextOffset;
    },
  });
};
