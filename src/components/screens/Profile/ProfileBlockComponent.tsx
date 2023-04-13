import { ProfilePostsResponseInterface } from '@api/profile/types/profile.posts.response.interface';
import { FooterVersionApp } from '@components/UI/Footer/FooterVersionApp';
import { PostsComponent } from '@components/UI/Post/PostsComponent';
import { ErrorSnackbar } from '@components/UI/Snackbar';
import { useSnackbar } from '@hooks/useSnackbar';
import { errorTransformService } from '@services/error/errorTransform.service';
import { urlService } from '@services/link/url.service';
import { utilsService } from '@services/utils/utils.service';
import { UseInfiniteQueryResult, UseQueryResult } from '@tanstack/react-query';
import { Icon24Like } from '@vkontakte/icons';
import {
  Avatar,
  Button,
  Div,
  Gradient,
  Group,
  Placeholder,
  PullToRefresh,
  SimpleCell,
  Spinner,
  Title,
  usePlatform,
} from '@vkontakte/vkui';
import { Platform } from '@vkontakte/vkui/dist/lib/platform';
import { clsx } from 'clsx';
import { FC, useCallback, useMemo, useRef } from 'react';
import styles from './profile.module.css';

interface IProfileComponent {
  // firstName: string;
  // lastName: string;
  // photo: string;
  // id: number;
  post: UseInfiniteQueryResult<ProfilePostsResponseInterface, unknown>;
  like: UseQueryResult<{ count: number }, unknown>;
}

export const ProfileBlockComponent: FC<IProfileComponent> = ({
  post,
  like,
}) => {
  const { setSnackbar } = useSnackbar();
  const platform = usePlatform();
  const isRefrech = useRef(false);

  // const [isPullToRefrech, setIsPullToRefrech] = useState(false);
  // const [selectTab, setSelectTab] = useState<THomeTab>('all');

  const allPosts = useMemo(() => {
    console.log('Изменился состав постов');
    if (post?.data?.pages?.length)
      return post.data?.pages?.map((page) => page?.items).flat();
  }, [post?.data, post?.dataUpdatedAt]);

  // const onSelectTab = (type: THomeTab) => {
  //   setSelectTab(type);
  // };

  const onRefrech = useCallback(async () => {
    console.log(isRefrech.current);
    if (isRefrech.current) return;
    isRefrech.current = true;
    like.refetch();
    return post
      .refetch()
      .then()
      .catch((error_) =>
        setSnackbar(
          <ErrorSnackbar>
            {errorTransformService.getMessageError(error_)}
          </ErrorSnackbar>,
        ),
      )
      .finally(() => (isRefrech.current = false));
  }, []);

  if (post?.isError)
    return (
      <PullToRefresh onRefresh={onRefrech} isFetching={isRefrech.current}>
        <Group>
          <Placeholder>
            {errorTransformService.getMessageError(post.error)}
          </Placeholder>
        </Group>
      </PullToRefresh>
    );

  const user = post.data?.pages?.at(0)?.user;

  return (
    <>
      <PullToRefresh onRefresh={onRefrech} isFetching={isRefrech.current}>
        <Group>
          <Gradient
            className={clsx(
              styles.Gradient,
              platform === Platform.VKCOM && styles.Gradient__desktop,
            )}
          >
            <Avatar
              src={user?.photo}
              size={96}
              onClick={() => urlService.openTab(`https://vk.com/id${user?.id}`)}
            />
            <Title className={styles.Gradient_Title} level="2" weight="2">
              {!user?.photo && 'Загрузка...'}
              {user?.first_name} {user?.last_name}
            </Title>

            <SimpleCell disabled before={<Icon24Like />} style={{}}>
              Заработано{' '}
              {like.isSuccess
                ? utilsService.declOfNum(
                    utilsService.numberFormat(like.data.count),

                    ['лайк', 'лайка', 'лайков'],
                  )
                : 'загрузка...'}{' '}
            </SimpleCell>
          </Gradient>
        </Group>
        <PostsComponent
          isLoading={post.isLoading}
          posts={allPosts ?? []}
          isForTopChildren
          bottom={
            <Div>
              <Button
                stretched
                mode="secondary"
                loading={post.isFetchingNextPage}
                onClick={() => post.fetchNextPage()}
                disabled={!post.hasNextPage}
              >
                {post.hasNextPage ? 'Показать еще' : 'Показаны все записи'}
              </Button>
            </Div>
          }
        >
          {/*<TabsTypeWallComponent select={selectTab} onClick={onSelectTab} />*/}
        </PostsComponent>

        {post.isFetchingNextPage && (
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
        <FooterVersionApp />
      </PullToRefresh>
    </>
  );
};
