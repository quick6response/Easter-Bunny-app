import { useUploadPhoto } from '@api/photo/hooks/useUploadPhoto';
import { useCreateWallPost } from '@api/posts/hooks/useCreateWallPost';
import { ModalPageComponent } from '@components/UI/ModalPage/ModalPageComponent';
import { PostCreateComponent } from '@components/UI/Post/PostCreateComponent';
import { ErrorSnackbar } from '@components/UI/Snackbar';
import { postConfig } from '@config/post.config';
import { useAction } from '@hooks/useActions';
import { useAppSelector } from '@hooks/useAppSelector';
import { useRouterPopout } from '@hooks/useRouterPopout';
import { useSnackbar } from '@hooks/useSnackbar';
import { ModalInterface } from '@routes/interface/modal.interface';
import { errorTransformService } from '@services/error/errorTransform.service';
import { postCreateActions } from '@store/post/post.create.slice';
import { Icon48WritebarSend } from '@vkontakte/icons';
import { PanelHeaderButton } from '@vkontakte/vkui';
import { FC, useEffect, useRef } from 'react';

const PostCreateModal: FC<ModalInterface> = ({
  onClose,
  nav,
  ...properties
}) => {
  const { pushParameter, closeElement } = useRouterPopout();
  const { setSnackbar } = useSnackbar();
  const referenceFile = useRef<File>();
  const postCreate = useAction(postCreateActions);
  const text = useAppSelector((state) => state.postCreate.text);
  const {
    mutate: mutatePhoto,
    mutateAsync: mutatePhotoAsync,
    error,
    isSuccess,
    data: dataPhoto,
    isError,
    isLoading,
  } = useUploadPhoto();
  const {
    mutateAsync: mutatePostAsync,
    mutate: mutatePost,
    error: errorPost,
  } = useCreateWallPost();

  useEffect(() => {
    return () => {
      postCreate.reset();
    };
  }, []);

  const isDisableSend =
    !referenceFile.current ||
    (!!text &&
      text?.replace(/\s+/g, ' ').trim()?.length < postConfig.minLength) ||
    isLoading ||
    isSuccess;

  const onSubmit = async () => {
    try {
      const formData = new FormData();
      if (referenceFile?.current)
        formData.append('photo', referenceFile?.current);
      if (isDisableSend)
        return setSnackbar(
          <ErrorSnackbar>
            Загрузите фотографию, чтобы разместить запись.
          </ErrorSnackbar>,
        );
      await mutatePhoto(formData);
      const uploadPhoto = await mutatePhotoAsync(formData);
      const createPost = await mutatePostAsync({
        text: text,
        photo: uploadPhoto?.hash,
      });
      return setTimeout(() => {
        return closeElement();
      }, 1000);
    } catch (error_) {
      console.error(error_);
    }
  };

  return (
    <ModalPageComponent
      nav={nav}
      name={'Создание записи'}
      onClose={onClose}
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
      <PostCreateComponent
        refPhoto={referenceFile}
        errorPhoto={
          error ? errorTransformService.getMessageError(error) : undefined
        }
        errorPost={
          errorPost
            ? errorTransformService.getMessageError(errorPost)
            : undefined
        }
        isSuccess={isSuccess}
        isLoading={isLoading}
      />
    </ModalPageComponent>
  );
};

export default PostCreateModal;
