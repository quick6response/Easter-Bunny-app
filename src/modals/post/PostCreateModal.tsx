import { useUploadPhoto } from '@api/photo/hooks/useUploadPhoto';
import { useCreateWallPost } from '@api/posts/hooks/useCreateWallPost';
import { FooterVersionApp } from '@components/UI/Footer/FooterVersionApp';
import { ModalPageComponent } from '@components/UI/ModalPage/ModalPageComponent';
import { PostCreateComponent } from '@components/UI/Post/PostCreateComponent';
import { ErrorSnackbar } from '@components/UI/Snackbar';
import { linkConfig } from '@config/link.config';
import { postConfig } from '@config/post.config';
import { useAction } from '@hooks/useActions';
import { useAppSelector } from '@hooks/useAppSelector';
import { useConfirmClosePostCreate } from '@hooks/useConfirmClosePostCreate';
import { useRouterPopout } from '@hooks/useRouterPopout';
import { useSnackbar } from '@hooks/useSnackbar';
import { ModalInterface } from '@routes/interface/modal.interface';
import { errorTransformService } from '@services/error/errorTransform.service';
import { urlService } from '@services/link/url.service';
import { postCreateActions } from '@store/post/post.create.slice';
import { Icon16InfoCirle, Icon48WritebarSend } from '@vkontakte/icons';
import { Group, Link, MiniInfoCell, PanelHeaderButton } from '@vkontakte/vkui';
import { FC, KeyboardEventHandler, useEffect, useRef } from 'react';

const PostCreateModal: FC<ModalInterface> = ({
  onClose,
  nav,
  ...properties
}) => {
  const { closeElement } = useRouterPopout();
  const { setSnackbar } = useSnackbar();
  const referenceFile = useRef<File>();
  const postCreate = useAction(postCreateActions);
  const text = useAppSelector((state) => state.postCreate.text);
  const uploadPhotoPost = useUploadPhoto();
  const createWallPost = useCreateWallPost();
  const { settlingHeight, backPostCreate } = useConfirmClosePostCreate();

  useEffect(() => {
    return () => {
      postCreate.reset();
    };
  }, []);

  const isDisableSend =
    !referenceFile.current ||
    (!!text &&
      text?.replace(/\s+/g, ' ').trim()?.length < postConfig.minLength) ||
    createWallPost.isLoading ||
    uploadPhotoPost.isLoading ||
    createWallPost.isSuccess;

  const onSubmit = async () => {
    try {
      const formData = new FormData();
      if (referenceFile?.current)
        formData.append('photo', referenceFile?.current);
      if (isDisableSend)
        return setSnackbar(
          <ErrorSnackbar>
            Загрузите фотографию, чтобы опубликовать запись.
          </ErrorSnackbar>,
        );
      const uploadPhoto = await uploadPhotoPost.mutateAsync(formData);
      const createPost = await createWallPost.mutateAsync({
        text: text,
        photo: uploadPhoto.hash,
      });
    } catch (error_) {
      console.error('Ошибка загрузки фотографии:', error_);
    }
  };

  const onKeyDown = (eventTTT: KeyboardEventHandler<HTMLElement>) => {};

  return (
    <ModalPageComponent
      nav={nav}
      name="Создание записи"
      onClose={onClose}
      button={
        !createWallPost?.isSuccess && (
          <PanelHeaderButton
            aria-label="Создать запись"
            onClick={onSubmit}
            style={{ filter: isDisableSend ? 'brightness(40%)' : undefined }}
            disabled={isDisableSend}
          >
            <Icon48WritebarSend />
          </PanelHeaderButton>
        )
      }
      {...properties}
    >
      <Group
        onKeyDown={(event) => {
          if (event.ctrlKey && event.key === 'Enter' && !isDisableSend) {
            onSubmit();
          }
        }}
      >
        <PostCreateComponent
          refPhoto={referenceFile}
          errorPhoto={
            uploadPhotoPost.error
              ? errorTransformService.getMessageError(uploadPhotoPost.error)
              : undefined
          }
          errorPost={
            createWallPost.error
              ? errorTransformService.getMessageError(createWallPost.error)
              : undefined
          }
          isError={createWallPost.isError || uploadPhotoPost.isError}
          isSuccess={createWallPost.isSuccess}
          isLoading={createWallPost.isLoading || uploadPhotoPost.isLoading}
        />
        <MiniInfoCell before={<Icon16InfoCirle />} textWrap="short">
          Публикуя запись, Вы автоматически соглашаетесь с{' '}
          <Link onClick={() => urlService.openTab(linkConfig.rulesPost)}>
            правилами
          </Link>{' '}
          нашего сервиса.
        </MiniInfoCell>
        <FooterVersionApp />
      </Group>
    </ModalPageComponent>
  );
};

export default PostCreateModal;
