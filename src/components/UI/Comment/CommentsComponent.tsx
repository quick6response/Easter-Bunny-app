import { RichCellComment } from '@components/UI/Comment/RichCellComment';
import { useAppSelector } from '@hooks/useAppSelector';
import { useRouterPanel } from '@hooks/useRouterPanel';
import { CommentModel } from '@models/comment.model';
import { PanelTypes, ViewTypes } from '@routes/structure.navigate';
import { errorTransformService } from '@services/error/errorTransform.service';
import { utilsService } from '@services/utils/utils.service';
import { Icon32ErrorCircle } from '@vkontakte/icons';
import {
  CellButton,
  Header,
  List,
  Placeholder,
  Separator,
  Spinner,
} from '@vkontakte/vkui';
import { FC, memo, useEffect, useRef } from 'react';

interface ICommentComponent {
  comments?: CommentModel[];
  allCountComments?: number;
  focusGroup?: boolean;
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
    allCountComments = 0,
    focusGroup = false,
  }) => {
    const { toPanelAndView, toPanel } = useRouterPanel();
    const userId = useAppSelector((state) => state.user.vk_id);
    const commentReference = useRef<HTMLElement>(null);

    useEffect(() => {
      if (!focusGroup) return;
      commentReference.current?.focus({ preventScroll: true });
    }, [focusGroup]);

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

    return (
      <>
        {comments?.length ? (
          <List>
            <Separator />
            <Header mode="primary">
              Всего{' '}
              {utilsService.declOfNum(allCountComments, [
                'комментарий',
                'комментария',
                'комментариев',
              ])}
            </Header>
            {comments.map((comment) => (
              <RichCellComment
                comment={comment}
                key={comment.id}
                onClickAvatar={onClickAvatarUser}
              />
            ))}
            <CellButton
              centered
              disabled={!hasNextPage}
              onClick={fetchNextPage}
            >
              {hasNextPage
                ? isFetchingNextPage
                  ? 'Загрузка...'
                  : 'Показать еще'
                : 'Показаны все комментарии'}
            </CellButton>
          </List>
        ) : (
          <Placeholder>Комментариев пока нет</Placeholder>
        )}
      </>
    );
  },
);
