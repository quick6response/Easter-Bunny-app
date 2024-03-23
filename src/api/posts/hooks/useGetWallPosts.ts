import { WallApi } from '@api/posts/wall.api';
import { PostModel } from '@models/post.model';
import { THomeTab } from '@store/wall/wall.panel.slice';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';

const LIMIT_DATA = 10;
export const useGetWallPosts = (tab: THomeTab) => {
  const queryClient = useQueryClient();
  return useInfiniteQuery({
    queryKey: ['wall', tab],
    queryFn: ({ pageParam }) => {
      return (
        // {
        //   all: 0,
        //   count: 0,
        //   items: [
        //     {
        //       id: 211,
        //       vk_id: 489_343_394_947,
        //       hash: '0a88887911033e1dd73f',
        //       text: 'щшшшошош',
        //       date_create: '2024-03-20T21:59:27+03:00',
        //       date_update: '2024-03-20T21:59:27+03:00',
        //       photo: {
        //         id: 214,
        //         url: 'https://srv4.ithube.ru/file/eggs/56e205289fe0acf22ad7',
        //         height: 679,
        //         width: 991,
        //         size: 646_288,
        //         ext: 'jpg',
        //         date: '2024-03-20T21:59:26+03:00',
        //       },
        //       likes: {
        //         count: 0,
        //         user_likes: 0,
        //       },
        //       comments: {
        //         count: 0,
        //         user_comments: 0,
        //       },
        //       user: {
        //         id: 489_343_394_947,
        //         first_name: 'DELETED',
        //         last_name: '',
        //         photo:
        //           'https://sun1-28.userapi.com/McdpcTNn6Mp4mz_rP2cHD_9_ewdfWU4Va-T42g/qwMS8N3slgU.png',
        //         sex: 0,
        //         client: 'vk',
        //       },
        //     },
        //   ] as PostModel[],
        //   last_date: new Date().toString(),
        //   offset: 0,
        // } ||
        WallApi.getPosts({
          offset: pageParam?.nextOffset,
          last_date: pageParam?.lastDate,
          count: 10,
          tab,
        })
      );
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
      return { nextOffset, lastDate: lastPage.last_date };
    },
  });
};
