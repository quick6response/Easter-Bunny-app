import { ImagePost } from '@components/UI/Post/Image/ImagePost';
import { PostModel } from '@models/post.model';
import { dateService } from '@services/date/date.service';
import { userService } from '@services/user/user.service';
import { utilsService } from '@services/utils/utils.service';
import {
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
  Group,
  RichCell,
  Text,
} from '@vkontakte/vkui';
import { clsx } from 'clsx';
import { FC, useLayoutEffect, useState } from 'react';
import styles from './post.module.css';

export const PostComponent: FC<PostModel> = ({
  id,
  photo,
  user_id,
  text,
  date_create,
  likes,
  comments,
}) => {
  const [user, setUser] = useState<UserInfo>();
  const [like, setLike] = useState(false);

  useLayoutEffect(() => {
    const getUserInfo = async () => {
      const getUser = await userService.getInfo(user_id);
      if (!getUser) return;
      setUser(getUser);
    };
    getUserInfo();
  }, []);

  const onClickViewPost = () => {};

  const userPhoto = user?.photo_200;
  const userName = user ? `${user.first_name} ${user.last_name}` : undefined;

  // TODO: Добавить открытие профиля пользователя в приле по нажатию на автарку
  return (
    <Group
      key={id}
      className={clsx(styles.group, {
        'person-skeleton': !user,
      })}
      style={{
        cursor: 'pointer',
        zIndex: 2,
      }}
      separator="auto"
      onClick={() => onClickViewPost()}
    >
      <RichCell
        disabled
        before={
          !userPhoto ? (
            <div className="person-skeleton-photo"></div>
          ) : (
            <Avatar size={40} src={userPhoto} />
          )
        }
        caption={dateService.convertDateAndTimeToFormat(date_create)}
      >
        {userName ?? <div className="person-skeleton-name" />}
      </RichCell>

      <ImagePost photo={photo} text={text} />

      <Div>
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
    </Group>
  );
};
