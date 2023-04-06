import { useGetComments } from '@api/comment/hooks/useGetComments';
import { useGetPostInfo } from '@api/posts/hooks/useGetPostInfo';
import { CommentsResponseInterface } from '@api/posts/types/comments.response.interface';
import { PostInfoComponent } from '@components/screens/PostInfo/PostInfoComponent';
import { PanelHeaderToBack } from '@components/UI/PanelHeader';
import { useAction } from '@hooks/useActions';
import { useAppSelector } from '@hooks/useAppSelector';
import { useParams } from '@itznevikat/router';
import { PanelInterface } from '@routes/interface/panel.interface';
import { postInfoSliceActions } from '@store/post/post.info.slice';
import { Panel } from '@vkontakte/vkui';
import { FC, useCallback, useMemo } from 'react';

const PostInfoPage: FC<PanelInterface> = ({ nav }) => {
  const { hash } = useParams<{ hash: string }>();
  const postInfoAction = useAction(postInfoSliceActions);
  const isPullToRefrech = useAppSelector(
    (state) => state.postInfo.isPullToRefrech,
  );

  const { isLoading, isError, data, error, refetch, isSuccess } =
    useGetPostInfo(hash);
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

  const allComments: CommentsResponseInterface | undefined = useMemo(() => {
    if (dataComments?.pages?.length)
      return {
        ...(dataComments.pages?.at(-1) || dataComments.pages[0]),
        items: dataComments?.pages?.map((page) => page?.items).flat(),
      };
  }, [dataComments]);

  const pullToRefrech = useCallback(() => {
    if (isPullToRefrech) return;
    postInfoAction.setIsPullToRefrech(true);
    refetch();
    refetchComments();
    return setTimeout(() => postInfoAction.setIsPullToRefrech(false), 1000);
  }, [isPullToRefrech]);

  console.log('Load:', isLoading, 'Error:', isError, 'OK:', isSuccess);

  return (
    <>
      <Panel nav={nav}>
        <PanelHeaderToBack name="Запись" />
        <PostInfoComponent
          hash={hash}
          post={data}
          errorPost={error}
          isSuccess={isSuccess}
          isLoading={isLoading}
          isError={isError}
          fetchNextPage={fetchNextPage}
          isErrorComments={isErrorComment}
          isFetchingNextPage={isFetchingNextPage}
          isLoadingComments={isLoadingComment}
          hasNextPage={hasNextPage}
          errorComments={errorComment}
          comments={allComments}
          onPullToRefrech={pullToRefrech}
        />
      </Panel>
    </>
  );
};

export default PostInfoPage;
