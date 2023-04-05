import { PostApi } from '@api/posts/post.api';
import { PostResponseInterface } from '@api/posts/types/post.response.interface';
import { InfiniteData, useQuery, useQueryClient } from '@tanstack/react-query';

export const useGetPostInfo = (hash: string) => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ['posts', hash],
    queryFn: () => PostApi.getInfo(hash),
    enabled: !!hash,
    placeholderData: () => {
      // Use the smaller/preview version of the blogPost from the 'blogPosts'
      // query as the placeholder data for this blogPost query
      return queryClient
        .getQueryData<InfiniteData<PostResponseInterface>>(['posts'])
        ?.pages.find((d) => d?.items?.find((post) => post.hash === hash))
        ?.items.find((post) => post.hash === hash);
    },
  });
};
