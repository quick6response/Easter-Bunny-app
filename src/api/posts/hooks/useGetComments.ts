import { PostApi } from '@api/posts/post.api';
import { useInfiniteQuery } from '@tanstack/react-query';

const LIMIT_DATA = 10;
export const useGetComments = (hash: string | undefined) => {
  return useInfiniteQuery({
    queryKey: ['posts', hash, 'comments', LIMIT_DATA],
    queryFn: ({ pageParam }) =>
      PostApi.getComments(hash, {
        offset: pageParam || 0,
        count: LIMIT_DATA,
      }),
    enabled: !!hash,
    cacheTime: 5 * 60 * 1000,
    staleTime: 2 * 60 * 1000,
    getNextPageParam: (lastPage) => {
      if (lastPage.items.length === 0) return null;
      const nextOffset =
        lastPage?.count === LIMIT_DATA ? lastPage?.offset + LIMIT_DATA : null;
      if (!nextOffset) return null;
      return nextOffset;
    },
  });
};
