import styles from '@components/UI/Comment/comment.module.css';
import { useAppSelector } from '@hooks/useAppSelector';
import { useRouterPopout } from '@hooks/useRouterPopout';
import { useActionRef } from '@itznevikat/router';
import { CommentModel } from '@models/comment.model';
import { PopoutElement } from '@routes/structure.popout';
import { dateService } from '@services/date/date.service';
import {
  Icon16DeleteOutline,
  Icon16ErrorCircleOutline,
} from '@vkontakte/icons';
import {
  Avatar,
  calcInitialsAvatarColor,
  IconButton,
  RichCell,
  usePlatform,
} from '@vkontakte/vkui';
import { createRef, FC, memo, useEffect, useState } from 'react';
import { AlertsConfigEnum } from '../../../modals/alerts.config';

export const RichCellComment: FC<{
  comment: CommentModel;
  onClickAvatar: (id_vk: number) => void;
  isViewButtonReport?: boolean;
}> = memo(({ comment, onClickAvatar, isViewButtonReport = true }) => {
  const platform = usePlatform();
  const userId = useAppSelector((state) => state.user.vk_id);
  const referenceRich = createRef<HTMLDivElement>();
  const { pushParameter, replaceParameter } = useRouterPopout();
  const [showButton, setShowButton] = useState(false);
  const { setActionRefHandler, setActionRef, actionRef } = useActionRef(() =>
    pushParameter('popout', PopoutElement.CommentActionSheet, {
      commentId: comment.id,
    }),
  );

  function handleMouseEnter() {
    setShowButton(true);
  }
  function handleMouseLeave() {
    setShowButton(false);
  }

  const onClickDeleteMyComment = () => {
    pushParameter('popout', AlertsConfigEnum.CommentDelete, {
      commentId: comment.id,
    });
  };

  useEffect(() => {
    if (!isViewButtonReport) return;
    // if (userId === comment.vk_id) return;
    referenceRich.current?.addEventListener('mouseenter', handleMouseEnter);
    referenceRich.current?.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      referenceRich.current?.removeEventListener(
        'mouseenter',
        handleMouseEnter,
      );
      referenceRich.current?.removeEventListener(
        'mouseleave',
        handleMouseLeave,
      );
    };
  }, []);

  return (
    <RichCell
      getRootRef={referenceRich}
      key={comment.id}
      multiline
      before={
        <Avatar
          size={48}
          src={comment?.user?.photo}
          style={{
            cursor: 'pointer',
          }}
          onClick={() => onClickAvatar(comment.vk_id)}
          initials={`${comment?.user?.first_name?.slice(
            0,
            1,
          )}${comment?.user?.last_name?.slice(0, 1)}`}
          gradientColor={calcInitialsAvatarColor(comment.vk_id)}
        ></Avatar>
      }
      caption={dateService.convertDateAndTimeToFormat(comment.date)}
      text={<div className={styles.text}>{comment.text}</div>}
      after={
        <div>
          {showButton &&
            (comment.vk_id !== userId ? (
              <IconButton
                onClick={setActionRefHandler}
                style={{
                  zIndex: 10,
                  // width: 16,
                  // height: 16,
                }}
              >
                <Icon16ErrorCircleOutline />
              </IconButton>
            ) : (
              <IconButton
                style={{
                  zIndex: 10,
                  // width: 16,
                  // height: 16,
                }}
                onClick={onClickDeleteMyComment}
              >
                <Icon16DeleteOutline />
              </IconButton>
            ))}
        </div>
      }
    >
      <div
        style={{ cursor: 'pointer', width: '50lvi' }}
        onClick={() => onClickAvatar(comment.vk_id)}
      >{`${comment.user.first_name} ${comment.user.last_name}`}</div>
    </RichCell>
  );
});
