import { ImagePost } from '@components/screens/Home/Image/ImagePost';
import { PostModel } from '@models/post.model';
import { dateService } from '@services/date/date.service';
import { userService } from '@services/user/user.service';
import { UserInfo } from '@vkontakte/vk-bridge';
import { Avatar, Gallery, Group, RichCell } from '@vkontakte/vkui';
import { clsx } from 'clsx';
import { FC, useLayoutEffect, useState } from 'react';
import styles from './home.module.css';

export const PostComponent: FC<PostModel> = ({
  id,
  photo,
  user_id,
  text,
  date_create,
  likes,
}) => {
  const [user, setUser] = useState<UserInfo>();

  useLayoutEffect(() => {
    const getUserInfo = async () => {
      const getUser = await userService.getInfo(user_id);
      if (!getUser) return;
      setUser(getUser);
    };
    getUserInfo();
  }, []);

  const userPhoto = user?.photo_200;
  const userName = user ? `${user.first_name} ${user.last_name}` : undefined;

  // TODO: Добавить открытие профиля пользователя в приле по нажатию на автарку
  return (
    <Group
      key={id}
      className={clsx(styles.group, {
        'person-skeleton': !user,
      })}
    >
      <RichCell
        disabled
        before={
          !userPhoto ? (
            <div className="person-skeleton-photo"></div>
          ) : (
            <Avatar size={48} src={userPhoto} />
          )
        }
        caption={dateService.convertDateAndTimeToFormat(date_create)}
      >
        {userName ?? <div className="person-skeleton-name" />}
      </RichCell>

      <Gallery slideWidth="90%">
        <ImagePost photo={photo} text={text} />
      </Gallery>

      <div>{text}</div>
    </Group>
  );
};
