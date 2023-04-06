import { useGetCountLikeProfile } from '@api/profile/hooks/useGetCountLikeProfile';
import { useGetPostsProfile } from '@api/profile/hooks/useGetPostsProfile';
import { TabsTypeWallComponent } from '@components/Tabs/TabsTypeWallComponent';
import { PostsComponent } from '@components/UI/Post/PostsComponent';
import { PostModel } from '@models/post.model';
import { urlService } from '@services/link/url.service';
import { utilsService } from '@services/utils/utils.service';
import { THomeTab } from '@store/wall/wall.panel.slice';
import { Icon24Like } from '@vkontakte/icons';
import {
  Avatar,
  Button,
  Gradient,
  Group,
  PullToRefresh,
  SimpleCell,
  Spinner,
  Title,
  usePlatform,
} from '@vkontakte/vkui';
import { Platform } from '@vkontakte/vkui/dist/lib/platform';
import { clsx } from 'clsx';
import { FC, useCallback, useMemo, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import styles from './profile.module.css';

interface IProfileComponent {
  firstName: string;
  lastName: string;
  photo: string;
  id: number;
  posts: PostModel[];
}

export const ProfileComponent: FC<IProfileComponent> = ({
  id,
  lastName,
  firstName,
  photo,
}) => {
  const platform = usePlatform();
  const [isPullToRefrech, setIsPullToRefrech] = useState(false);
  const [selectTab, setSelectTab] = useState<THomeTab>('all');
  const {
    isLoading,
    isSuccess,
    error,
    data,
    isError,
    isRefetching,
    refetch,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useGetPostsProfile();
  const countLike = useGetCountLikeProfile();
  const { ref, inView } = useInView({
    threshold: 0.7,
  });

  const allPosts = useMemo(() => {
    console.log('Изменился состав постов');
    if (data?.pages?.length)
      return data?.pages?.map((page) => page?.items).flat();
  }, [data]);

  const onSelectTab = (type: THomeTab) => {
    setSelectTab(type);
  };

  const onRefrech = useCallback(() => {
    if (isPullToRefrech) return;
    refetch();
    return setTimeout(() => setIsPullToRefrech(false), 1000);
  }, [isPullToRefrech]);

  return (
    <>
      <PullToRefresh onRefresh={onRefrech} isFetching={isRefetching}>
        <Group>
          <Gradient
            className={clsx(
              styles.Gradient,
              platform === Platform.VKCOM && styles.Gradient__desktop,
            )}
          >
            <Avatar
              src={photo}
              size={96}
              onClick={() => urlService.openTab(`https://vk.com/id${id}`)}
            />
            <Title className={styles.Gradient_Title} level="2" weight="2">
              {!photo && 'Загрузка...'}
              {firstName} {lastName}
            </Title>

            <SimpleCell disabled before={<Icon24Like />} style={{}}>
              Заработано{' '}
              {countLike.isSuccess
                ? utilsService.declOfNum(countLike.data.count, [
                    'лайка',
                    'лайков',
                    'лайк',
                  ])
                : 'загрузка...'}{' '}
            </SimpleCell>
          </Gradient>
        </Group>
        <PostsComponent
          isLoading={isLoading}
          posts={allPosts ?? []}
          isForTopChildren
          bottom={
            <Button
              stretched
              mode="secondary"
              loading={isFetchingNextPage}
              onClick={() => fetchNextPage()}
              disabled={!hasNextPage}
            >
              {hasNextPage ? 'Показать еще' : 'Показаны все записи'}
            </Button>
          }
        >
          <TabsTypeWallComponent select={selectTab} onClick={onSelectTab} />
        </PostsComponent>

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
    </>
  );
};
