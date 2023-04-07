import {useSetLikePost} from '@api/like/hooks/useSetLikePost';
import {ImagePost} from '@components/UI/Post/Image/ImagePost';
import {PostFocusType} from '@components/UI/Post/types/post.focus.type';
import {ErrorSnackbar} from '@components/UI/Snackbar';
import {useRouterPanel} from '@hooks/useRouterPanel';
import {useRouterPopout} from '@hooks/useRouterPopout';
import {useSnackbar} from '@hooks/useSnackbar';
import {useActionRef, useParams} from '@itznevikat/router';
import {PostModel} from '@models/post.model';
import {PanelTypes} from '@routes/structure.navigate';
import {PopoutElement} from '@routes/structure.popout';
import {dateService} from '@services/date/date.service';
import {errorTransformService} from '@services/error/errorTransform.service';
import {tapticSendSignal} from '@services/taptic-mobile/taptic.service';
import {utilsService} from '@services/utils/utils.service';
import {
  Icon16MoreVertical,
  Icon16Pin,
  Icon24Comment,
  Icon24Share,
  Icon28LikeFillRed,
  Icon28LikeOutline,
} from '@vkontakte/icons';
import {Avatar, Button, ButtonGroup, Div, IconButton, RichCell, Text,} from '@vkontakte/vkui';
import {FC, memo, PropsWithChildren} from 'react';
import styles from './post.module.css';

export const PostComponent: FC<PropsWithChildren<{ post: PostModel }>> = memo(
  ({
    post: { id, photo, text, date_create, likes, comments, hash, user, pin },
    children,
  }) => {
    const { setSnackbar } = useSnackbar();
    const { toPanel, toPanelAndView } = useRouterPanel();
    const { pushParameter } = useRouterPopout();
    const { hash: hashParameter } = useParams<{ hash: string }>();

    const { setActionRefHandler } = useActionRef(() =>
      pushParameter('popout', PopoutElement.PostActionSheet, {
        hash,
      }),
    );
    const { setActionRefHandler: setActionReferenceHandlerPost } = useActionRef(
      () => toPanel(PanelTypes.POST_INFO, { hash }),
    );
    const { mutateAsync } = useSetLikePost();

    const onClickLike = async () => {
      try {
        const setLike = await mutateAsync(hash);
        if (likes.user_likes !== setLike.user_likes)
          likes.user_likes = !!setLike.user_likes;
        if (likes.count !== setLike.count) likes.count = setLike.count;
        console.log(likes, setLike);
        tapticSendSignal('success');
        // setLike(setLikeResponse.user_likes);
      } catch (error) {
        setSnackbar(
          <ErrorSnackbar>
            {errorTransformService.getMessageError(error)}
          </ErrorSnackbar>,
        );
      }
    };

    const onClickViewPost = (type: PostFocusType = 'wall') => {
      if (hashParameter !== hash)
        toPanel(PanelTypes.POST_INFO, { hash, focus: type });
    };

    const onClickActionPost = (
      event: React.MouseEvent<HTMLElement, MouseEvent>,
    ) => {
      return setActionRefHandler(event);
    };

    const userName = user ? `${user.first_name} ${user.last_name}` : undefined;

    // TODO: Добавить открытие профиля пользователя в приле по нажатию на автарку
    return (
      <>
        <RichCell
          key={id}
          disabled
          before={
            !user?.photo ? (
              <div className="person-skeleton-photo"></div>
            ) : (
              <Avatar size={40} src={user?.photo} />
            )
          }
          after={
            <IconButton
              hoverMode="opacity"
              aria-label="Действие с записью"
              onClick={onClickActionPost}
            >
              <Icon16MoreVertical />
            </IconButton>
          }
          caption={dateService.convertDateAndTimeToFormat(date_create)}
        >
          {(
            <>
              {userName} {''}
              {pin && (
                <Icon16Pin
                  style={{
                    display: 'inline-block',
                    color: 'var(--vkui--color_icon_accent)',
                    verticalAlign: 'text-top',
                  }}
                />
              )}
            </>
          ) ?? <div className="person-skeleton-name" />}
        </RichCell>

        <ImagePost photo={photo} text={text} />

        {text?.length > 0 && (
          <Div onClick={() => onClickViewPost('wall')} className={styles.text}>
            <Text weight="3">{text}</Text>
          </Div>
        )}

        <ButtonGroup mode="horizontal" gap="none">
          <Button
            size="l"
            appearance="accent"
            mode="tertiary"
            onClick={onClickLike}
            before={
              likes.user_likes ? <Icon28LikeFillRed /> : <Icon28LikeOutline />
            }
          >
            <div>{utilsService.numberFormat(likes.count)}</div>
          </Button>
          <Button
            size="l"
            appearance="accent"
            mode="tertiary"
            before={<Icon24Comment />}
            onClick={() => onClickViewPost('comments')}
          >
            <div>{utilsService.numberFormat(comments.count)}</div>
          </Button>
          <Button
            size="l"
            appearance="accent"
            mode="tertiary"
            before={<Icon24Share />}
          ></Button>
        </ButtonGroup>

        <div className={styles.childElement}>{children}</div>
      </>
    );
  },
);
