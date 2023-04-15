import { useAppSelector } from '@hooks/useAppSelector';
import { useParams } from '@itznevikat/router';
import { ModalInterface } from '@routes/interface/modal.interface';
import { urlService } from '@services/link/url.service';
import { Icon24Done, Icon56ShareOutline } from '@vkontakte/icons';
import bridge from '@vkontakte/vk-bridge';
import { Button, ButtonGroup, Link, ModalCard } from '@vkontakte/vkui';
import { FC, useMemo, useState } from 'react';

export const UsersShareModalCard: FC<ModalInterface> = ({
  nav,
  onClose,
  ...otherProperties
}) => {
  const userId = useAppSelector((state) => state.user.vk_id);
  const { userId: userIdParameters } =
    useParams<{ userId: string }>() || userId;
  const [isShareMessage, setIsShareMessage] = useState(false);
  const [isSharePost, setIsSharePost] = useState(false);

  const isMyShareProfile = useMemo(
    () => !userIdParameters || userId === Number(userIdParameters),
    [userIdParameters],
  );

  const onClickShareMessage = () => {
    bridge
      .send('VKWebAppShare', {
        link: `https://vk.com/app51585569#profile/user?userId=${
          isMyShareProfile ? userId : userIdParameters
        }`,
      })
      .then(() => setIsShareMessage(true));
  };
  const onClickPostShare = () => {
    const link = `https://vk.com/app51585569#profile/user?userId=${
      isMyShareProfile ? userId : userIdParameters
    }`;
    const textTransform = isMyShareProfile
      ? '💡 Переходи в Мой профиль и смотри мои пасхальные публикации.'
      : `💡 Переходи в профиль @id${userIdParameters} и смотри его пасхальные публикации.`;
    bridge
      .send('VKWebAppShowWallPostBox', {
        message: textTransform,
        attachments: link,
      })
      .then((data) => {
        if (data.post_id) {
          // Запись размещена
          setIsSharePost(true);
        }
      })
      .catch((error) => {
        // Ошибка
        console.log(error);
      });
  };

  return (
    <ModalCard
      id={nav}
      onClose={onClose}
      icon={<Icon56ShareOutline />}
      header={
        <>
          {' '}
          Поделиться ссылкой на{' '}
          {isMyShareProfile ? (
            'свой профиль'
          ) : (
            <>
              профиль{' '}
              <Link
                onClick={() =>
                  urlService.openTab(`https://vk.com/id${userIdParameters}`)
                }
              >
                @id{userIdParameters}
              </Link>
            </>
          )}
        </>
      }
      actions={
        <ButtonGroup mode="vertical" stretched>
          <Button
            key="join"
            size="l"
            mode="primary"
            stretched
            before={isShareMessage && <Icon24Done />}
            onClick={() => onClickShareMessage()}
          >
            В сообщениях
          </Button>
          <Button
            key="copy"
            size="l"
            mode="primary"
            stretched
            before={isSharePost && <Icon24Done />}
            onClick={() => onClickPostShare()}
          >
            Запись на стене
          </Button>
        </ButtonGroup>
      }
    ></ModalCard>
  );
};
