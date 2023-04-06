import { useCreateComment } from '@api/posts/hooks/useCreateComment';
import { CommentsResponseInterface } from '@api/posts/types/comments.response.interface';
import styles from '@components/UI/Comment/comment.module.css';
import { CommentsComponent } from '@components/UI/Comment/CommentsComponent';
import { WriteBarComment } from '@components/UI/Comment/WriteBar/WriteBarComment';
import { PostComponent } from '@components/UI/Post/PostComponent';
import { useAppSelector } from '@hooks/useAppSelector';
import { PostModel } from '@models/post.model';
import { errorTransformService } from '@services/error/errorTransform.service';
import { Icon36IncognitoOutline } from '@vkontakte/icons';
import { Group, Placeholder, PullToRefresh, Spinner } from '@vkontakte/vkui';
import { FC, useState } from 'react';

type IPostInfoComponent = {
  hash: string;
  isError: boolean;
  isSuccess: boolean;
  isLoading: boolean;
  errorPost?: unknown;
  post?: PostModel;

  isErrorComments: boolean;
  isLoadingComments: boolean;
  errorComments?: unknown;
  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  hasNextPage?: boolean;
  comments?: CommentsResponseInterface;

  onPullToRefrech: () => void;
};

export const PostInfoComponent: FC<IPostInfoComponent> = ({
  post,
  isError: isErrorPost,
  isLoading: isLoadingPost,
  errorPost,
  comments,
  isLoadingComments,
  isErrorComments,
  errorComments,
  isFetchingNextPage,
  hasNextPage,
  fetchNextPage,
  onPullToRefrech,
}) => {
  const isPullToRefrech = useAppSelector(
    (state) => state.postInfo.isPullToRefrech,
  );
  const [textComment, setTextComment] = useState('');

  const {
    mutate,
    mutateAsync,
    isLoading: isLoadingCreate,
  } = useCreateComment();

  if (isLoadingPost)
    return (
      <Group>
        <Placeholder>
          <Spinner></Spinner>
        </Placeholder>
      </Group>
    );
  if (isErrorPost)
    return (
      <Group>
        <Placeholder icon={<Icon36IncognitoOutline />}>
          {errorTransformService.getMessageError(errorPost)}
        </Placeholder>
      </Group>
    );

  if (!post) return <div>Информации о посте не найдено</div>;

  const createComment = async () => {
    const sendComment = await mutateAsync({
      text: textComment,
      hash: post.hash,
    });
    setTextComment('');
  };

  return (
    <Group>
      <PullToRefresh
        onRefresh={() => onPullToRefrech()}
        isFetching={isPullToRefrech}
      >
        <PostComponent post={post}>
          <CommentsComponent
            comments={comments?.items}
            isError={isErrorComments}
            isLoading={isLoadingComments}
            error={errorComments}
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
};
