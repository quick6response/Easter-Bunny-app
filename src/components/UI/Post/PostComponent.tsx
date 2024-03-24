import { useSetLikePost } from '@api/like/hooks/useSetLikePost';
import { ImagePost } from '@components/UI/Post/Image/ImagePost';
import { PostFocusType } from '@components/UI/Post/types/post.focus.type';
import { ErrorSnackbar } from '@components/UI/Snackbar';
import { useAppSelector } from '@hooks/useAppSelector';
import { useRouterPanel } from '@hooks/useRouterPanel';
import { useRouterPopout } from '@hooks/useRouterPopout';
import { useSnackbar } from '@hooks/useSnackbar';
import { useActionRef, useParams } from '@itznevikat/router';
import { PostModel } from '@models/post.model';
import { PanelTypes, ViewTypes } from '@routes/structure.navigate';
import { PopoutElement } from '@routes/structure.popout';
import { dateService } from '@services/date/date.service';
import { errorTransformService } from '@services/error/errorTransform.service';
import { tapticSendSignal } from '@services/taptic-mobile/taptic.service';
import { utilsService } from '@services/utils/utils.service';
import {
  Icon16MoreVertical,
  Icon16Pin,
  Icon24Comment,
  Icon24Share,
  Icon28LikeFillRed,
  Icon28LikeOutline,
} from '@vkontakte/icons';
import {
  Avatar,
  Button,
  ButtonGroup,
  Div,
  IconButton,
  RichCell,
  Text,
} from '@vkontakte/vkui';
import { FC, memo, PropsWithChildren } from 'react';
import { ModalPageEnum } from '../../../modals/modals.config';
import styles from './post.module.css';

export const PostComponent: FC<
  PropsWithChildren<{ post: PostModel; isViewButton?: boolean }>
> = memo(
  ({
    post: {
      id,
      photo,
      text,
      date_create,
      likes,
      comments,
      hash,
      user,
      pin,
      vk_id,
    },
    children,
    isViewButton: isViewButton = true,
  }) => {
    const { setSnackbar } = useSnackbar();
    const { toPanel, toPanelAndView, view, panel } = useRouterPanel();
    const { pushParameter } = useRouterPopout();
    const { hash: hashParameter } = useParams<{ hash: string }>();

    const userId = useAppSelector((state) => state.user.vk_id);

    const { setActionRefHandler } = useActionRef(() =>
      pushParameter(
        'popout',
        PopoutElement.PostActionSheet,
        {
          hash,
        },
        {
          hash,
        },
      ),
    );

    const { mutateAsync } = useSetLikePost(vk_id);

    const onClickLike = async () => {
      try {
        tapticSendSignal('success');
        likes.user_likes = likes.user_likes === 0 ? 1 : 0;
        likes.count -= likes.user_likes ? -1 : +1;

        await mutateAsync(hash);
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

    const onClickSharePost = async () => {
      pushParameter('modal', ModalPageEnum.POST_SHARE, {
        hash,
        text,
        photoUrl: photo.url,
        userPhoto: user.photo,
      });
    };

    const onClickActionPost = (
      event: React.MouseEvent<HTMLElement, MouseEvent>,
    ) => {
      return setActionRefHandler(event);
    };

    const onClickAvatarUser = () => {
      return vk_id === userId
        ? toPanelAndView(ViewTypes.PROFILE, PanelTypes.PROFILE_HOME)
        : toPanel(PanelTypes.PROFILE_USER, { userId: vk_id });
    };

    const onClickPinIcon = () => {
      pushParameter('modal', ModalPageEnum.POST_PIN_INFO);
    };

    const userName = user ? `${user.first_name} ${user.last_name}` : undefined;

    return (
      <>
        <RichCell
          key={id}
          disabled
          before={
            user?.photo ? (
              <Avatar
                size={40}
                src={user?.photo}
                onClick={onClickAvatarUser}
                style={{ cursor: 'pointer' }}
              />
            ) : (
              <div className="person-skeleton-photo"></div>
            )
          }
          after={
            isViewButton && (
              <IconButton
                hoverMode="opacity"
                aria-label="Действие с записью"
                onClick={onClickActionPost}
              >
                <Icon16MoreVertical />
              </IconButton>
            )
          }
          caption={dateService.convertDateAndTimeToFormat(date_create)}
        >
          {(
            <>
              <div style={{ display: 'flex' }}>
                <div style={{ cursor: 'pointer' }} onClick={onClickAvatarUser}>
                  {userName}
                </div>
                <div style={{ left: '10px' }}>
                  {pin && (
                    <Icon16Pin
                      // onClick={onClickPinIcon}
                      style={{
                        display: 'inline-block',
                        color: 'var(--vkui--color_icon_accent)',
                        verticalAlign: 'text-top',
                      }}
                    />
                  )}
                </div>
              </div>
            </>
          ) ?? <div className="person-skeleton-name" />}
        </RichCell>

        <ImagePost photo={photo.url} text={text} />

        {text?.length > 0 && (
          <Div
            onClick={() => onClickViewPost('wall')}
            style={{ cursor: 'pointer' }}
          >
            <Text weight="3" className={styles.text}>
              {text}
            </Text>
          </Div>
        )}

        {isViewButton && (
          <ButtonGroup mode="horizontal" gap="none">
            <Button
              size="l"
              appearance="accent"
              mode="tertiary"
              onClick={onClickLike}
              label="Лайк"
              aria-label="Лайк"
              aria-placeholder="Лайк"
              before={
                likes.user_likes ? <Icon28LikeFillRed /> : <Icon28LikeOutline />
              }
            >
              <div>{utilsService.numberFormat(likes.count)}</div>
            </Button>
            {hashParameter !== hash && (
              <Button
                size="l"
                appearance="accent"
                mode="tertiary"
                before={<Icon24Comment />}
                label="Комментарии"
                aria-label="Комментарии"
                aria-placeholder="Комментарии"
                onClick={() => onClickViewPost('comments')}
              >
                <div>{utilsService.numberFormat(comments.count)}</div>
              </Button>
            )}
            <Button
              size="l"
              appearance="accent"
              mode="tertiary"
              label="Поделиться"
              aria-label="Поделиться"
              aria-placeholder="Поделиться"
              onClick={onClickSharePost}
              before={<Icon24Share />}
            ></Button>
          </ButtonGroup>
        )}
        {children}
      </>
    );
  },
);
