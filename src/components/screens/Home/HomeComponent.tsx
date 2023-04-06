import { useGetWallPosts } from '@api/posts/hooks/useGetWallPosts';
import { PanelHeaderTabs } from '@components/screens/Home/PanelHeaderTabs';
import { PostsComponent } from '@components/UI/Post/PostsComponent';
import { useAppSelector } from '@hooks/useAppSelector';
import { useQueryClient } from '@tanstack/react-query';
import { Group, Placeholder, PullToRefresh, Spinner } from '@vkontakte/vkui';
import { FC, memo, useEffect, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';

export const HomeComponent: FC = memo(() => {
  const queryClient = useQueryClient();
  const activeTab = useAppSelector((state) => state.wallPanel.tab);
  const [isFetchingComponent, setIsFetchingComponent] = useState(false);
  const {
    data,
    fetchNextPage,
    refetch,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useGetWallPosts(activeTab);

  const { ref, inView } = useInView({
    threshold: 0.7,
  });

  const allPosts = useMemo(() => {
    console.log('Изменился состав постов', hasNextPage);
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
    refetch({});
    setIsFetchingComponent(false);
  }, [isFetchingComponent]);

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
        onRefresh={() => setIsFetchingComponent(true)}
        isFetching={isFetchingComponent}
      >
        {allPosts && <PostsComponent posts={allPosts} />}
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
});
