import { WallApi } from '@api/wall/wall.api';
import { useInfiniteQuery } from '@tanstack/react-query';

type TGetWall = {
  lastDate: string;
  pageParam?: string;
};

const LIMIT_DATA = 10;
export const useGetWallPosts = (reference: string) => {
  return useInfiniteQuery({
    queryKey: ['posts', reference],
    queryFn: ({ pageParam, meta }) =>
      WallApi.getPosts({
        offset: pageParam,
        last_date: reference,
        count: 10,
      }),
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
    getNextPageParam: (lastPage) => {
      if (lastPage.items.length === 0) return null;
      return lastPage?.items.length === LIMIT_DATA
        ? lastPage?.offset + LIMIT_DATA
        : null;
    },
    // onSuccess: (data) => {
    //   console.log('Обновили дату');
    //   // reference = data.pages[0].last_date;
    // },
  });
};
