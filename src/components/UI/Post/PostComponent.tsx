import { ImagePost } from '@components/UI/Post/Image/ImagePost';
import { useAppSelector } from '@hooks/useAppSelector';
import { useRouterPanel } from '@hooks/useRouterPanel';
import { useRouterPopout } from '@hooks/useRouterPopout';
import { useActionRef, useParams } from '@itznevikat/router';
import { PostModel } from '@models/post.model';
import { PanelTypes } from '@routes/structure.navigate';
import { PopoutTypes } from '@routes/structure.popout';
import { dateService } from '@services/date/date.service';
import { userService } from '@services/user/user.service';
import { utilsService } from '@services/utils/utils.service';
import {
  Icon16MoreVertical,
  Icon24Comment,
  Icon24Share,
  Icon28LikeFillRed,
  Icon28LikeOutline,
} from '@vkontakte/icons';
import { UserInfo } from '@vkontakte/vk-bridge';
import {
  Avatar,
  Button,
  ButtonGroup,
  Div,
  IconButton,
  RichCell,
  Text,
} from '@vkontakte/vkui';
import { FC, PropsWithChildren, useLayoutEffect, useState } from 'react';
import styles from './post.module.css';

export const PostComponent: FC<PropsWithChildren<PostModel>> = ({
  id,
  photo,
  vk_id,
  text,
  date_create,
  likes,
  comments,
  hash,
  children,
}) => {
  const userId = useAppSelector((state) => state.userVk.id);
  const { hash: hashParameter } = useParams<{ hash: string }>();
  const { pushParameter } = useRouterPopout();
  const [user, setUser] = useState<UserInfo>();
  const [like, setLike] = useState(false);
  const { toPanel } = useRouterPanel();

  const { setActionRefHandler, setActionRef } = useActionRef(() =>
    pushParameter('popout', PopoutTypes.PostActionSheet, {
      hash: hashParameter,
      photoId: photo?.id,
      myPost: vk_id === userId,
    }),
  );

  useLayoutEffect(() => {
    const getUserInfo = async () => {
      const getUser = await userService.getInfo(vk_id);
      if (!getUser) return;
      setUser(getUser);
    };
    getUserInfo();
  }, []);

  const onClickViewPost = () => {
    if (hashParameter !== hash) toPanel(PanelTypes.POST_INFO, { hash });
  };

  const onClickActionPost = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    return setActionRefHandler(event);
  };

  const userPhoto = user?.photo_200;
  const userName = user ? `${user.first_name} ${user.last_name}` : undefined;

  // TODO: Добавить открытие профиля пользователя в приле по нажатию на автарку
  return (
    <>
      <RichCell
        key={id}
        disabled
        before={
          !userPhoto ? (
            <div className="person-skeleton-photo"></div>
          ) : (
            <Avatar size={40} src={userPhoto} />
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

      <Div onClick={() => onClickViewPost()}>
        <Text weight="3">{text}</Text>
      </Div>

      <ButtonGroup mode="horizontal" gap="none">
        <Button
          size="l"
          appearance="accent"
          mode="tertiary"
          onClick={() => setLike((previousState) => !previousState)}
          before={like ? <Icon28LikeFillRed /> : <Icon28LikeOutline />}
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
};
