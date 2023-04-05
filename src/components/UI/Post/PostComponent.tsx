import { useSetLikePost } from '@api/posts/hooks/useSetLikePost';
import { ImagePost } from '@components/UI/Post/Image/ImagePost';
import { ErrorSnackbar } from '@components/UI/Snackbar';
import { useAppSelector } from '@hooks/useAppSelector';
import { useRouterPanel } from '@hooks/useRouterPanel';
import { useRouterPopout } from '@hooks/useRouterPopout';
import { useSnackbar } from '@hooks/useSnackbar';
import { useActionRef, useParams } from '@itznevikat/router';
import { PostModel } from '@models/post.model';
import { PanelTypes } from '@routes/structure.navigate';
import { PopoutTypes } from '@routes/structure.popout';
import { dateService } from '@services/date/date.service';
import { errorTransformService } from '@services/error/errorTransform.service';
import { utilsService } from '@services/utils/utils.service';
import {
  Icon16MoreVertical,
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
import styles from './post.module.css';

export const PostComponent: FC<PropsWithChildren<{ post: PostModel }>> = memo(
  ({
    post: { id, photo, vk_id, text, date_create, likes, comments, hash, user },
    children,
  }) => {
    const { setSnackbar } = useSnackbar();
    const { toPanel } = useRouterPanel();
    const { pushParameter } = useRouterPopout();
    const { hash: hashParameter } = useParams<{ hash: string }>();

    const userId = useAppSelector((state) => state.userVk.id);
    // const [like, setLike] = useState(likes.user_likes);

    const { setActionRefHandler, setActionRef } = useActionRef(() =>
      pushParameter('popout', PopoutTypes.PostActionSheet, {
        hash: text && hash,
        photoId: photo?.id,
        myPost: vk_id === userId,
      }),
    );
    const { mutate, mutateAsync } = useSetLikePost();

    const onClickLike = async () => {
      try {
        const setLikeResponse = await mutateAsync(hash);
        // setLike(setLikeResponse.user_likes);
      } catch (error) {
        setSnackbar(
          <ErrorSnackbar>
            {errorTransformService.getMessageError(error)}
          </ErrorSnackbar>,
        );
      }
    };

    const onClickViewPost = () => {
      if (hashParameter !== hash) toPanel(PanelTypes.POST_INFO, { hash });
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
          {userName ?? <div className="person-skeleton-name" />}
        </RichCell>

        <ImagePost photo={photo} text={text} />

        <Div onClick={() => onClickViewPost()} className={styles.text}>
          <Text weight="3">{text}</Text>
        </Div>

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
            onClick={() => onClickViewPost()}
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
