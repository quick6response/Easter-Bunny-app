import { appConfig } from '@config/app.config';
import { useMeta } from '@itznevikat/router';
import { PostModel } from '@models/post.model';
import { ModalInterface } from '@routes/interface/modal.interface';
import { Icon24Done } from '@vkontakte/icons';
import bridge from '@vkontakte/vk-bridge';
import { Avatar, Button, ButtonGroup, ModalCard } from '@vkontakte/vkui';
import { FC, useState } from 'react';

type TMetaModalShare = Pick<PostModel, 'hash' | 'text'> & {
  photoUrl: string;
  userPhoto: string;
};

export const ModalSharePost: FC<ModalInterface> = ({ onClose, nav }) => {
  const { hash, text, photoUrl, userPhoto } = useMeta<TMetaModalShare>();
  const [isShareMessage, setIsShareMessage] = useState(false);
  const [isSharePost, setIsSharePost] = useState(false);

  const onClickShareMessage = () => {
    const link = `${appConfig.appUrl}#wall/post?hash=${hash}`;
    bridge
      .send('VKWebAppShare', {
        link: link,
      })
      .then(() => setIsShareMessage(true));
  };
  const onClickPostShare = () => {
    const link = `${appConfig.appUrl}#wall/post?hash=${hash}`;
    const textTransform =
      (text?.length > 0
        ? text
        : 'Смотрите какой пост нашел в пасхальном сервисе!') +
      `\n\nВот ссылка на запись: ${link}`;
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
  const onClickCopyText = () => {
    return bridge.send('VKWebAppCopyText', { text });
  };

  return (
    <ModalCard
      id={nav}
      onClose={onClose}
      icon={<Avatar src={userPhoto} size={72} />}
      header="Поделиться записью"
      subheader={
        text?.length > 0 ? text : 'Текст не указан, но зато есть фотография.'
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
            mode="secondary"
            stretched
            before={isSharePost && <Icon24Done />}
            onClick={() => onClickPostShare()}
          >
            Разместить запись на стене
          </Button>
        </ButtonGroup>
      }
    ></ModalCard>
  );
};
