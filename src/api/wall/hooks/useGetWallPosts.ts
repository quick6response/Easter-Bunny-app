import { WallApi } from '@api/wall/wall.api';
import { useInfiniteQuery } from '@tanstack/react-query';

type TGetWall = {
  lastDate: string;
  pageParam?: string;
};

const LIMIT_DATA = 10;
export const useGetWallPosts = () => {
  return useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam, meta }) => {
      return WallApi.getPosts({
        offset: pageParam?.nextOffset,
        last_date: pageParam?.lastDate,
        count: 10,
      });
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    getNextPageParam: (lastPage) => {
      if (lastPage.items.length === 0) return null;
      const nextOffset =
        lastPage?.items.length === LIMIT_DATA
          ? lastPage?.offset + LIMIT_DATA
          : null;
      if (!nextOffset) return null;
      return { nextOffset, lastDate: lastPage.last_date };
    },
    // onSuccess: (data) => {
    //   console.log('Обновили дату');
    //   // reference = data.pages[0].last_date;
    // },
  });
};
