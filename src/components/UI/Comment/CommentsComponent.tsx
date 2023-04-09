import { CommentModel } from '@models/comment.model';
import { dateService } from '@services/date/date.service';
import { errorTransformService } from '@services/error/errorTransform.service';
import { Icon32ErrorCircle } from '@vkontakte/icons';
import {
  Avatar,
  CellButton,
  List,
  Placeholder,
  RichCell,
  Spinner,
} from '@vkontakte/vkui';
import { FC, memo } from 'react';
import styles from './comment.module.css';

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
    if (isLoading)
      return (
        <Placeholder icon={<Spinner />}>Загружаем комментарии...</Placeholder>
      );

    console.log('render comments block');
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
          <RichCell
            className={styles.comment}
            key={comment.id}
            multiline
            before={<Avatar size={48} src={comment.photo}></Avatar>}
            caption={dateService.convertDateAndTimeToFormat(comment.date)}
            text={comment.text}
          >
            {`${comment.first_name} ${comment.last_name}`}
          </RichCell>
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
