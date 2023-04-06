import { WallApi } from '@api/posts/wall.api';
import { THomeTab } from '@store/wall/wall.panel.slice';
import { useInfiniteQuery } from '@tanstack/react-query';

const LIMIT_DATA = 10;
export const useGetWallPosts = (tab: THomeTab) => {
  return useInfiniteQuery({
    queryKey: ['wall', tab],
    queryFn: ({ pageParam }) => {
      return WallApi.getPosts({
        offset: pageParam?.nextOffset,
        last_date: pageParam?.lastDate,
        count: 10,
        tab,
      });
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    getNextPageParam: (lastPage) => {
      if (lastPage.items.length === 0) return null;
      const nextOffset =
        lastPage?.count === LIMIT_DATA ? lastPage?.offset + LIMIT_DATA : null;
      if (!nextOffset) return null;
      return { nextOffset, lastDate: lastPage.last_date };
    },
  });
};
