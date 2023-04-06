import { useUploadPhoto } from '@api/photo/hooks/useUploadPhoto';
import { useCreateWallPost } from '@api/posts/hooks/useCreateWallPost';
import { ModalPageComponent } from '@components/UI/ModalPage/ModalPageComponent';
import { PostCreateComponent } from '@components/UI/Post/PostCreateComponent';
import { ErrorSnackbar } from '@components/UI/Snackbar';
import { linkConfig } from '@config/link.config';
import { postConfig } from '@config/post.config';
import { useAction } from '@hooks/useActions';
import { useAppSelector } from '@hooks/useAppSelector';
import { useRouterPopout } from '@hooks/useRouterPopout';
import { useSnackbar } from '@hooks/useSnackbar';
import { ModalInterface } from '@routes/interface/modal.interface';
import { errorTransformService } from '@services/error/errorTransform.service';
import { urlService } from '@services/link/url.service';
import { postCreateActions } from '@store/post/post.create.slice';
import { Icon16InfoCirle, Icon48WritebarSend } from '@vkontakte/icons';
import { Link, MiniInfoCell, PanelHeaderButton } from '@vkontakte/vkui';
import { FC, useEffect, useRef } from 'react';

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
  const {
    mutateAsync: mutatePhotoAsync,
    error,
    isSuccess,
    isError,
    isLoading,
  } = useUploadPhoto();
  const {
    mutateAsync: mutatePostAsync,
    error: errorPost,
    isError: isErrorPost,
    isLoading: isLoadingPost,
    isSuccess: isSuccessPost,
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
          aria-label="Создать запись"
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
        isError={isError || isErrorPost}
        isSuccess={isSuccessPost}
        isLoading={isLoading || isLoadingPost}
      />
      <MiniInfoCell before={<Icon16InfoCirle />} textWrap="short">
        Публикуя запись, Вы соглашаетесь c{' '}
        <Link onClick={() => urlService.openTab(linkConfig.rulesPost)}>
          правилами
        </Link>{' '}
        публикации записей в нашем сервисе.
      </MiniInfoCell>
    </ModalPageComponent>
  );
};

export default PostCreateModal;
