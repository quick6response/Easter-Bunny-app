import { ProfileApi } from '@api/profile/profile.api';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

const LIMIT_DATA = 20;
export const useGetPostsProfile = () => {
  const queryClient = useQueryClient();
  return useInfiniteQuery({
    queryKey: ['my', 'profile', 'posts'],
    queryFn: ({ pageParam }) => {
      return ProfileApi.getPosts({
        offset: pageParam,
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
