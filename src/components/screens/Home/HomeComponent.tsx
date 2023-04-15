import { useGetWallPosts } from '@api/posts/hooks/useGetWallPosts';
import { PanelHeaderTabs } from '@components/UI/PanelHeader';
import { PostsComponent } from '@components/UI/Post/PostsComponent';
import { useAppSelector } from '@hooks/useAppSelector';
import { useQueryClient } from '@tanstack/react-query';
import {
  Button,
  Div,
  Group,
  Placeholder,
  PullToRefresh,
  Spinner,
} from '@vkontakte/vkui';
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
    dataUpdatedAt,
  } = useGetWallPosts(activeTab);

  const { ref, inView } = useInView({
    threshold: 0.7,
  });

  const allPosts = useMemo(() => {
    // console.log('Изменился состав постов', hasNextPage);
    if (data?.pages?.length)
      return data?.pages?.map((page) => page?.items).flat();
  }, [data, dataUpdatedAt]);

  useEffect(() => {
    if (!isFetchingComponent) return;
    // only refetch the first page
    queryClient.removeQueries({
      queryKey: ['posts'],
    });
    queryClient.resetQueries({
      queryKey: ['posts'],
    });
    // console.log('Обновляю всю ленту 1');
    refetch({});
    setIsFetchingComponent(false);
  }, [isFetchingComponent]);

  useEffect(() => {
    // console.log(inView);
    if (inView && hasNextPage) {
      fetchNextPage();
      // console.log('запрашиваю еще записи');
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

  return (
    <PanelHeaderTabs>
      <PullToRefresh
        onRefresh={() => setIsFetchingComponent(true)}
        isFetching={isFetchingComponent}
      >
        <PostsComponent
          posts={allPosts ?? []}
          isLoading={isLoading}
          bottom={
            hasNextPage && (
              <Div>
                <Button
                  stretched
                  mode="secondary"
                  loading={isFetchingNextPage}
                  onClick={() => fetchNextPage()}
                  disabled={!hasNextPage}
                >
                  Показать еще
                </Button>
              </Div>
            )
          }
        />
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
        <div ref={ref} />
      </PullToRefresh>
    </PanelHeaderTabs>
  );
});
