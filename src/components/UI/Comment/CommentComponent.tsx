import { WriteBarComment } from '@components/UI/Comment/WriteBar/WriteBarComment';
import { CommentModel } from '@models/comment.model';
import { dateService } from '@services/date/date.service';
import { Avatar, RichCell } from '@vkontakte/vkui';
import { FC } from 'react';
import styles from './comment.module.css';

interface ICommentComponent {
  comments: CommentModel[];
}

export const CommentComponent: FC<ICommentComponent> = ({ comments }) => {
  const onSubmit = () => {
    console.log('отправка коммента');
  };

  return (
    <>
      {comments.map((comment) => (
        <RichCell
          className={styles.comment}
          key={comment.id}
          multiline
          before={<Avatar size={48} src={comment.user.photo}></Avatar>}
          caption={dateService.convertDateAndTimeToFormat(comment.date)}
          text={comment.text}
        >
          {`${comment.user.first_name} ${comment.user.last_name}`}
        </RichCell>
      ))}
      <WriteBarComment onSubmit={onSubmit} />
      <div className={styles.divPadding} />
    </>
  );
};
