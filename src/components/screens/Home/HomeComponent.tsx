import { useGetWallPosts } from '@api/wall/hooks/useGetWallPosts';
import { PanelHeaderTabs } from '@components/screens/Home/PanelHeaderTabs';
import { PostsComponent } from '@components/UI/Post/PostsComponent';
import { useQueryClient } from '@tanstack/react-query';
import { Group, Placeholder, PullToRefresh, Spinner } from '@vkontakte/vkui';
import { FC, useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export const HomeComponent: FC = () => {
  const queryClient = useQueryClient();
  const [isFetchingComponent, setIsFetchingComponent] = useState(false);
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
  } = useGetWallPosts();
  const { ref, inView, entry } = useInView({
    threshold: 0.7,
  });

  const allPosts = useMemo(() => {
    if (data?.pages?.length)
      return data?.pages?.map((page) => page?.items).flat();
  }, [data]);

  useEffect(() => {
    if (!isFetchingComponent) return;
    // only refetch the first page
    queryClient.removeQueries({
      queryKey: ['posts'],
    });
    queryClient.resetQueries({
      queryKey: ['posts'],
    });
    console.log('Обновляю всю ленту 1');
    refetch({
      /*refetchPage: (page, index) => index === 0*/
    });
    setIsFetchingComponent(false);
  }, [isFetchingComponent]);

  useEffect(() => {
    console.log(hasNextPage);
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
        onRefresh={() => setIsFetchingComponent(true)}
        isFetching={isFetchingComponent}
      >
        <PostsComponent
          posts={allPosts || []}
          countPosts={allPosts?.length || 0}
        />
        <div ref={ref} style={{ height: '10px' }}></div>
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
