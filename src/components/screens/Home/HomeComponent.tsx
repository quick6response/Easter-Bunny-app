import { useGetWallPosts } from '@api/wall/hooks/useGetWallPosts';
import { PanelHeaderTabs } from '@components/screens/Home/PanelHeaderTabs';
import { PostsComponent } from '@components/UI/Post/PostsComponent';
import { useQueryClient } from '@tanstack/react-query';
import { Group, Placeholder, PullToRefresh, Spinner } from '@vkontakte/vkui';
import { FC, useCallback, useEffect, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';

let lastDate = new Date().toISOString();
export const HomeComponent: FC = () => {
  const queryClient = useQueryClient();
  const {
    data,
    error,
    fetchNextPage,
    refetch,
    remove,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isLoading,
    isError,
    isSuccess,
  } = useGetWallPosts(lastDate);
  const { ref, inView, entry } = useInView({
    threshold: 0.5,
  });

  const allPosts = useMemo(() => {
    return data?.pages?.map((page) => page?.items).flat();
  }, [data]);

  const onRefethData = useCallback(() => {
    if (!isFetching) return;
    lastDate = new Date().toISOString();
    // only refetch the first page
    queryClient.removeQueries({
      queryKey: ['posts'],
    });
    queryClient.resetQueries({
      queryKey: ['posts'],
    });
    console.log('Обновляю всю ленту');
    refetch({
      /*refetchPage: (page, index) => index === 0*/
    });
  }, []);

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
      console.log('запрашиваю еще записи');
    }
  }, [inView]);

  if (isError)
    return (
      <PanelHeaderTabs>
        <Group>
          <Placeholder>Произошла ошибка получения записей.</Placeholder>
        </Group>
      </PanelHeaderTabs>
    );

  if (isLoading)
    return (
      <PanelHeaderTabs>
        <Group>
          <Spinner></Spinner>
        </Group>
      </PanelHeaderTabs>
    );

  return (
    <PanelHeaderTabs>
      <PullToRefresh
        onRefresh={onRefethData}
        disabled={isFetching}
        isFetching={isFetching}
      >
        <PostsComponent
          posts={allPosts || []}
          countPosts={allPosts?.length || 0}
        />
        <div ref={ref}></div>
        {isFetchingNextPage && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Spinner size="regular" style={{ margin: '20px 0' }} />
          </div>
        )}
      </PullToRefresh>
    </PanelHeaderTabs>
  );
};
