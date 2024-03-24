import { useCreateComment } from '@api/comment/hooks/useCreateComment';
import { useGetComments } from '@api/comment/hooks/useGetComments';
import { useGetPostInfo } from '@api/posts/hooks/useGetPostInfo';
import { CommentsResponseInterface } from '@api/posts/types/comments.response.interface';
import styles from '@components/UI/Comment/comment.module.css';
import { CommentsComponent } from '@components/UI/Comment/CommentsComponent';
import { WriteBarComment } from '@components/UI/Comment/WriteBar/WriteBarComment';
import { PostComponent } from '@components/UI/Post/PostComponent';
import { PostFocusType } from '@components/UI/Post/types/post.focus.type';
import { ErrorSnackbar } from '@components/UI/Snackbar';
import { useAction } from '@hooks/useActions';
import { useAdvertisingShow } from '@hooks/useAdvertisingShow';
import { useAppSelector } from '@hooks/useAppSelector';
import { useSnackbar } from '@hooks/useSnackbar';
import { errorTransformService } from '@services/error/errorTransform.service';
import { postInfoSliceActions } from '@store/post/post.info.slice';
import { wallPanelSliceActions } from '@store/wall/wall.panel.slice';
import { Icon36IncognitoOutline } from '@vkontakte/icons';
import { Group, Placeholder, PullToRefresh, Spinner } from '@vkontakte/vkui';
import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';

type IPostInfoComponent = {
  hash: string;
  focus: PostFocusType;
};

export const PostInfoComponent: FC<IPostInfoComponent> = memo(({ hash }) => {
  const { show } = useAdvertisingShow();
  const wallPostAction = useAction(wallPanelSliceActions);
  const postInfoAction = useAction(postInfoSliceActions);
  const { setSnackbar } = useSnackbar();
  const isPullToRefrech = useAppSelector(
    (state) => state.postInfo.isPullToRefrech,
  );
  const [textComment, setTextComment] = useState('');

  const { isLoading, isError, data, error, refetch } = useGetPostInfo(hash);
  const {
    isLoading: isLoadingComment,
    isError: isErrorComment,
    data: dataComments,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    refetch: refetchComments,
    error: errorComment,
  } = useGetComments(hash);
  const { mutateAsync, isLoading: isLoadingCreate } = useCreateComment();

  useEffect(() => {
    wallPostAction.plusCount();
    show();
  }, []);

  // сборка всех комментариев для компонента
  const allComments: CommentsResponseInterface | undefined = useMemo(() => {
    if (dataComments?.pages?.length) {
      // debugger;
      const lastPage = dataComments?.pages?.at(-1);
      const infoLastPage =
        lastPage === undefined ? dataComments?.pages[0] : lastPage;
      return {
        all: infoLastPage.all,
        count: infoLastPage.count,
        offset: infoLastPage.offset,
        user_comments: infoLastPage.user_comments,
        items: dataComments?.pages?.map((page) => page?.items).flat(),
      };
    }
  }, [dataComments]);

  const pullToRefresh = useCallback(() => {
    if (isPullToRefrech) return;
    postInfoAction.setIsPullToRefrech(true);
    refetch();
    refetchComments();
    return setTimeout(() => postInfoAction.setIsPullToRefrech(false), 1000);
  }, [isPullToRefrech]);

  const createComment = useCallback(
    async (text: string) => {
      try {
        await mutateAsync({
          text,
          hash,
        });
        setTextComment('');
      } catch (error_) {
        setSnackbar(
          <ErrorSnackbar>
            {errorTransformService.getMessageError(error_)}
          </ErrorSnackbar>,
        );
      }
    },
    [hash],
  );

  if (isLoading)
    return (
      <Group>
        <Placeholder>
          <Spinner></Spinner>
        </Placeholder>
      </Group>
    );

  if (isError)
    return (
      <Group>
        <Placeholder icon={<Icon36IncognitoOutline />}>
          {errorTransformService.getMessageError(error)}
        </Placeholder>
      </Group>
    );

  if (!data)
    return (
      <Group>
        <Placeholder>Запись не найдена. Возможно она не создана.</Placeholder>
      </Group>
    );

  return (
    <Group>
      <PullToRefresh
        onRefresh={() => pullToRefresh()}
        isFetching={isPullToRefrech}
      >
        <PostComponent post={data}>
          <CommentsComponent
            comments={allComments?.items ?? []}
            allCountComments={allComments?.all || 0}
            isError={isErrorComment}
            isLoading={isLoadingComment}
            error={errorComment}
            hasNextPage={!!hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
          />
        </PostComponent>
      </PullToRefresh>
      <WriteBarComment
        onSubmit={createComment}
        text={textComment}
        setText={setTextComment}
        isLoading={isLoadingCreate}
      />
      <div className={styles.divPadding} />
    </Group>
  );
});
