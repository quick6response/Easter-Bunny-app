import { ProfileApi } from '@api/profile/profile.api';
import { useInfiniteQuery } from '@tanstack/react-query';

const LIMIT_DATA = 20;
export const useGetPostsProfile = () => {
  return useInfiniteQuery({
    queryKey: ['my', 'profile', 'posts'],
    queryFn: ({ pageParam }) => {
      return ProfileApi.getPosts({
        offset: pageParam,
        count: 0,
      });
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
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
