import { useGetModerationWall } from '@api/admin/moderation/hooks/useGetModerationWall';
import { useVoteModerationWall } from '@api/admin/moderation/hooks/useVoteModerationWall';
import { ModerationWallType } from '@api/admin/moderation/types/moderation.wall.type';
import { ModerationPostComponent } from '@components/screens/AdminModerationWall/ModerationPostComponent';
import { FooterVersionApp } from '@components/UI/Footer/FooterVersionApp';
import { ErrorSnackbar } from '@components/UI/Snackbar';
import { useSnackbar } from '@hooks/useSnackbar';
import { errorTransformService } from '@services/error/errorTransform.service';
import { Icon24ErrorCircle } from '@vkontakte/icons';
import {
  Group,
  List,
  Placeholder,
  PullToRefresh,
  Spinner,
} from '@vkontakte/vkui';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

export const AdminModerationWallComponent = () => {
  const { setSnackbar } = useSnackbar();
  const isRefrech = useRef(false);

  const getPostModeration = useGetModerationWall();
  const votePostModeration = useVoteModerationWall();
  const { ref, inView } = useInView({
    threshold: 0.7,
  });

  useEffect(() => {
    if (inView && getPostModeration.hasNextPage) {
      getPostModeration.fetchNextPage();
      console.log('запрашиваю еще записи');
    }
  }, [inView]);

  const allPosts = useMemo(() => {
    console.log('Изменился состав постов');
    if (getPostModeration?.data?.pages?.length)
      return getPostModeration.data?.pages?.map((page) => page?.items).flat();
  }, [getPostModeration?.data, getPostModeration?.dataUpdatedAt]);

  const onRefrech = useCallback(async () => {
    if (isRefrech.current) return;
    isRefrech.current = true;

    return getPostModeration
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

  const onClickButtonVote = async (dto: ModerationWallType) => {
    try {
      const vote = await votePostModeration.mutateAsync(dto);
      return true;
    } catch (error) {
      setSnackbar(
        <ErrorSnackbar>
          {errorTransformService.getMessageError(error)}
        </ErrorSnackbar>,
      );
      return false;
    }
  };

  if (getPostModeration.isLoading)
    return (
      <Group>
        <Placeholder icon={<Spinner />}>Загружается...</Placeholder>
      </Group>
    );

  if (getPostModeration.isError)
    return (
      <Group>
        <Placeholder icon={<Icon24ErrorCircle />}>
          {errorTransformService.getMessageError(getPostModeration.error)}
        </Placeholder>
      </Group>
    );

  return (
    <PullToRefresh onRefresh={onRefrech} isFetching={isRefrech.current}>
      <List>
        {allPosts?.length ? (
          allPosts?.map((post) => (
            <ModerationPostComponent
              key={post.id}
              post={post}
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
