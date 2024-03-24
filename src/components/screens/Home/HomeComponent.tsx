import { useGetWallPosts } from '@api/posts/hooks/useGetWallPosts';
import { PanelHeaderTabs } from '@components/UI/PanelHeader';
import { PostsComponent } from '@components/UI/Post/PostsComponent';
import { ErrorSnackbar } from '@components/UI/Snackbar';
import { useAction } from '@hooks/useActions';
import { useAppSelector } from '@hooks/useAppSelector';
import { useSnackbar } from '@hooks/useSnackbar';
import { tapticSendSignal } from '@services/taptic-mobile/taptic.service';
import { THomeTab, wallPanelSliceActions } from '@store/wall/wall.panel.slice';
import { useQueryClient } from '@tanstack/react-query';
import {
  Button,
  Div,
  Group,
  Placeholder,
  PullToRefresh,
  Spinner,
} from '@vkontakte/vkui';
import {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useInView } from 'react-intersection-observer';

// чем больше, то быстрее после второго нажатия произойдет переход в верхную часть экрана
const timeoutAutoScrollTop = 300;

export const HomeComponent: FC = memo(() => {
  const queryClient = useQueryClient();
  const { setSnackbar } = useSnackbar();
  const activeTab = useAppSelector((state) => state.wallPanel.tab);
  const wallPanelAction = useAction(wallPanelSliceActions);
  const clickTimeout = useRef<null | NodeJS.Timeout>(null);
  const lastClickTime = useRef(0);

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

    const invalidateAndFetchData = async () => {
      try {
        // Удаление и сброс значений в кеше
        // TODO выбрать вид, как будут обновлять посты в ленты 0- они пропадают и появляется лоудер или они остаются
        queryClient.removeQueries({
          queryKey: ['posts'],
        });
        await queryClient.resetQueries({
          queryKey: ['posts'],
        });
        // Чтобы лента не пропдала, нужно не включать это
        // queryClient.removeQueries({
        //   queryKey: ['wall'],
        // });
        // queryClient.resetQueries({
        //   queryKey: ['wall'],
        // });
        //
        // // Удаление и сброс значений в кеше
        await queryClient.invalidateQueries({ queryKey: ['posts'] });
        // queryClient.invalidateQueries({ queryKey: ['wall'] });

        // Выполнение запроса на получение данных
        await refetch();

        // Установка нового значения в setIsFetchingComponent
      } catch (error) {
        // Обработка ошибки
        console.error('Error fetching data:', error);
        setSnackbar(
          <ErrorSnackbar>
            Произошла ошибка при получении данных леты
          </ErrorSnackbar>,
        );
      }
    };

    invalidateAndFetchData().finally(() => {
      setIsFetchingComponent(false);
    });
  }, [isFetchingComponent, queryClient, refetch, setIsFetchingComponent]);

  useEffect(() => {
    // console.log(inView);
    if (inView && hasNextPage) {
      console.log('запрос еще записей', { inView, hasNextPage });
      fetchNextPage();
      // console.log('запрашиваю еще записи');
    }
  }, [inView, hasNextPage]);

  const onClickTab = useCallback(
    (tab: THomeTab) => {
      // console.log(tab);
      if (activeTab === tab) {
        const currentTime = Date.now();
        const interval = currentTime - lastClickTime.current;
        if (interval <= timeoutAutoScrollTop) {
          if (clickTimeout.current) clearTimeout(clickTimeout?.current);
          window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth',
          });
        } else {
          clickTimeout.current = setTimeout(() => {
            if (clickTimeout.current) clearTimeout(clickTimeout.current);
          }, timeoutAutoScrollTop);
        }
        lastClickTime.current = currentTime;
        return;
      }
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
      return wallPanelAction.setTab(tab);
    },
    [activeTab],
  );

  if (isError)
    return (
      <PanelHeaderTabs
        onClickTab={onClickTab}
        onRefresh={() => setIsFetchingComponent(true)}
      >
        <Group>
          <Placeholder>Произошла ошибка получения записей.</Placeholder>
        </Group>
      </PanelHeaderTabs>
    );

  const isReferenceDiv = useMemo(() => {
    return !(isFetchingNextPage || isLoading);
  }, [isFetchingNextPage, isLoading]);

  const onRefresh = () => {
    setIsFetchingComponent(true);
  };

  const onRefreshHeader = () => {
    setIsFetchingComponent(true);
    tapticSendSignal('success');
  };

  console.log({ isReferenceDiv, isFetchingNextPage, isLoading });
  return (
    <PanelHeaderTabs
      onClickTab={onClickTab}
      onRefresh={onRefreshHeader}
      isRefreshing={isFetchingComponent}
    >
      <PullToRefresh onRefresh={onRefresh} isFetching={isFetchingComponent}>
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
        <div ref={isReferenceDiv ? ref : undefined} />
      </PullToRefresh>
    </PanelHeaderTabs>
  );
});
