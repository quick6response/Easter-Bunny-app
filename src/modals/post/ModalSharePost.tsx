import { useGetPostInfo } from '@api/posts/hooks/useGetPostInfo';
import { appConfig } from '@config/app.config';
import { useMeta } from '@itznevikat/router';
import { PostModel } from '@models/post.model';
import { ModalInterface } from '@routes/interface/modal.interface';
import { photoService } from '@services/photo/photo.service';
import { Icon24Done } from '@vkontakte/icons';
import bridge from '@vkontakte/vk-bridge';
import { Avatar, Button, ButtonGroup, ModalCard } from '@vkontakte/vkui';
import { FC, useState } from 'react';

type TMetaModalShare = Pick<PostModel, 'hash' | 'text'> & {
  photoUrl: string;
  userPhoto: string;
};

const getUrlPost = (hash: string) =>
  `${appConfig.appUrl}#wall/post?hash=${hash}`;

export const ModalSharePost: FC<ModalInterface> = ({ onClose, nav }) => {
  const { hash, text, photoUrl, userPhoto } = useMeta<TMetaModalShare>();
  const { data: postData, isSuccess } = useGetPostInfo(hash);
  const [isShareMessage, setIsShareMessage] = useState(false);
  const [isLoadingCreatePhoto, setIsLoadingCreatePhoto] = useState(false);
  const [isSharePost, setIsSharePost] = useState(false);

  const onClickShareMessage = () => {
    bridge
      .send('VKWebAppShare', {
        link: getUrlPost(hash),
      })
      .then(() => setIsShareMessage(true));
  };
  const onClickPostShare = () => {
    const link = getUrlPost(hash);
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

  const onClickShareHistory = async () => {
    setIsLoadingCreatePhoto(true);
    const link = getUrlPost(hash);
    const createPhoto = await photoService.createHistory(
      photoUrl,
      postData?.likes?.count || 0,
    );

    return bridge
      .send('VKWebAppShowStoryBox', {
        background_type: 'image',
        blob: createPhoto,
        attachment: {
          text: 'view',
          type: 'url',
          url: link,
        },
      })
      .then((data) => {
        if (data.result) {
          // Редактор историй открыт
          console.log(data);
        }
      })
      .catch((error) => {
        // Ошибка
        console.log(error);
      })
      .finally(() => setIsLoadingCreatePhoto(false));
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

          <Button
            key="share history"
            size="l"
            mode="secondary"
            stretched
            loading={isLoadingCreatePhoto}
            headers="Запись популярная! Повыстье количество лайков!"
            onClick={() => onClickShareHistory()}
          >
            Разместить историю на странице
          </Button>
        </ButtonGroup>
      }
    ></ModalCard>
  );
};
