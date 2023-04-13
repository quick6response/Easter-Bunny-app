import { RichCellComment } from '@components/UI/Comment/RichCellComment';
import { useAppSelector } from '@hooks/useAppSelector';
import { useRouterPanel } from '@hooks/useRouterPanel';
import { CommentModel } from '@models/comment.model';
import { PanelTypes, ViewTypes } from '@routes/structure.navigate';
import { errorTransformService } from '@services/error/errorTransform.service';
import { Icon32ErrorCircle } from '@vkontakte/icons';
import { CellButton, List, Placeholder, Spinner } from '@vkontakte/vkui';
import { FC, memo } from 'react';

interface ICommentComponent {
  comments?: CommentModel[];

  isLoading: boolean;
  isError: boolean;

  fetchNextPage: () => void;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;

  error?: unknown;
}

export const CommentsComponent: FC<ICommentComponent> = memo(
  ({
    comments,
    isError,
    error,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  }) => {
    const { toPanelAndView, toPanel } = useRouterPanel();
    const userId = useAppSelector((state) => state.user.vk_id);

    const onClickAvatarUser = (commentUserId: number) => {
      if (commentUserId === userId)
        return toPanelAndView(ViewTypes.PROFILE, PanelTypes.PROFILE_HOME);
      else toPanel(PanelTypes.PROFILE_USER, { userId: commentUserId });
    };

    if (isLoading)
      return (
        <Placeholder icon={<Spinner />}>Загружаем комментарии...</Placeholder>
      );

    if (isError)
      return (
        <Placeholder icon={<Icon32ErrorCircle />}>
          {errorTransformService.getMessageError(error)}
        </Placeholder>
      );

    if (comments?.length === 0)
      return <Placeholder>Комментариев пока нет</Placeholder>;

    return (
      <List>
        {comments?.map((comment) => (
          <RichCellComment
            comment={comment}
            key={comment.id}
            onClickAvatar={onClickAvatarUser}
          />
        ))}
        <CellButton centered disabled={!hasNextPage} onClick={fetchNextPage}>
          {!hasNextPage
            ? 'Показаны все комментарии'
            : isFetchingNextPage
            ? 'Загрузка...'
            : 'Показать еще'}
        </CellButton>
      </List>
    );
  },
);
