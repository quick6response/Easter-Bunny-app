import { useUploadPhoto } from '@api/photo/hooks/useUploadPhoto';
import { useCreateWallPost } from '@api/wall/hooks/useCreateWallPost';
import { ModalPageComponent } from '@components/UI/ModalPage/ModalPageComponent';
import { PostCreateComponent } from '@components/UI/Post/PostCreateComponent';
import { ErrorSnackbar } from '@components/UI/Snackbar';
import { useAction } from '@hooks/useActions';
import { useAppSelector } from '@hooks/useAppSelector';
import { useRouterPopout } from '@hooks/useRouterPopout';
import { useSnackbar } from '@hooks/useSnackbar';
import { ModalInterface } from '@routes/interface/modal.interface';
import { PopoutTypes } from '@routes/structure.popout';
import { postCreateActions } from '@store/post/post.create.slice';
import { Icon48WritebarSend } from '@vkontakte/icons';
import { PanelHeaderButton } from '@vkontakte/vkui';
import { FC, useEffect, useState } from 'react';

const PostCreateModal: FC<ModalInterface> = ({
  onClose,
  nav,
  ...properties
}) => {
  const { closeElement } = useRouterPopout();
  const { pushParameter } = useRouterPopout();
  const { setSnackbar } = useSnackbar();
  const postCreate = useAction(postCreateActions);
  const text = useAppSelector((state) => state.postCreate.text);
  const [photo, setPhoto] = useState<File | null>();
  const { mutateAsync } = useUploadPhoto();
  const { mutateAsync: mutatePostAsync } = useCreateWallPost();

  useEffect(() => {
    return () => {
      postCreate.reset();
    };
  }, []);

  const isDisableSend =
    !photo || (!!text && text?.replace(/\s+/g, ' ').trim()?.length < 5);

  const onCloseConfirm = () => {
    console.log('Нас хотят закрыть');
    if (!photo && !text) return onClose();
    pushParameter('popout', PopoutTypes.PostCreateConfirmWindowClose);
  };

  const onSubmit = async () => {
    const formData = new FormData();
    if (isDisableSend)
      return setSnackbar(
        <ErrorSnackbar>
          Загрузите фотографию, чтобы разместить запись.
        </ErrorSnackbar>,
      );
    if (photo) formData.append('photo', photo);

    try {
      const uploadPhoto = await mutateAsync(formData);
      const createPost = await mutatePostAsync({
        text: text,
        photo: uploadPhoto?.hash,
      });
      onClose();
    } catch (error) {
      console.error(error);
      return setSnackbar(
        <ErrorSnackbar>
          Ошибка публикации поста, текста ошибки пока нет :)
        </ErrorSnackbar>,
      );
    }

    console.log(photo);
    console.log(text);
  };

  return (
    <ModalPageComponent
      nav={nav}
      name={'Создание записи'}
      onClose={onCloseConfirm}
      onClosed={onCloseConfirm}
      button={
        <PanelHeaderButton
          onClick={onSubmit}
          style={{ filter: isDisableSend ? 'brightness(40%)' : undefined }}
          disabled={isDisableSend}
        >
          <Icon48WritebarSend />
        </PanelHeaderButton>
      }
      {...properties}
    >
      <PostCreateComponent photo={[photo, setPhoto]} />
    </ModalPageComponent>
  );
};

export default PostCreateModal;
