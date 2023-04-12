import { useVoteModerationWall } from '@api/admin/moderation/hooks/useVoteModerationWall';
import { useGetAdminReportsPhotos } from '@api/admin/report/hooks/useGetAdminReportsPhotos';
import { ReportSendInterface } from '@api/report/types/report.send.interface';
import { ModerationPostComponent } from '@components/screens/AdminModerationWall/ModerationPostComponent';
import { FooterVersionApp } from '@components/UI/Footer/FooterVersionApp';
import { ErrorSnackbar } from '@components/UI/Snackbar';
import { useSnackbar } from '@hooks/useSnackbar';
import { errorTransformService } from '@services/error/errorTransform.service';
import {
  Group,
  List,
  Placeholder,
  PullToRefresh,
  Spinner,
} from '@vkontakte/vkui';
import { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

export const ModerationPhotosComponent: FC<{
  type: ReportSendInterface['type'];
}> = ({ type }) => {
  const getPhotos = useGetAdminReportsPhotos(type);
  const { setSnackbar } = useSnackbar();
  const isRefrech = useRef(false);

  const votePostModeration = useVoteModerationWall();
  const { ref, inView } = useInView({
    threshold: 0.7,
  });

  useEffect(() => {
    if (inView && getPhotos.hasNextPage) {
      getPhotos.fetchNextPage();
      console.log('запрашиваю еще записи');
    }
  }, [inView]);

  const allPosts = useMemo(() => {
    console.log('Изменился состав постов');
    if (getPhotos?.data?.pages?.length)
      return getPhotos.data?.pages?.map((page) => page?.items).flat();
  }, [getPhotos?.data, getPhotos?.dataUpdatedAt]);

  const onRefrech = useCallback(async () => {
    if (isRefrech.current) return;
    isRefrech.current = true;

    return getPhotos
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

  if (getPosts.isError)
    return (
      <Group>
        <Placeholder>
          {errorTransformService.getMessageError(getPosts.error)}
        </Placeholder>
      </Group>
    );

  if (getPosts.isLoading)
    return (
      <Group>
        <Placeholder icon={<Spinner />}>Загрузка...</Placeholder>
      </Group>
    );

  return (
    <PullToRefresh onRefresh={onRefrech} isFetching={isRefrech.current}>
      <List>
        {allPosts?.length ? (
          allPosts?.map((post) => (
            <ModerationPostComponent
              key={post.id}
              post={post.wall}
              onClickVoteButton={onClickButtonVote}
            />
          ))
        ) : (
          <Group>
            <Placeholder>Записей больше нет!</Placeholder>
          </Group>
        )}
      </List>
      <div ref={ref} />
      <FooterVersionApp />
    </PullToRefresh>
  );
};
