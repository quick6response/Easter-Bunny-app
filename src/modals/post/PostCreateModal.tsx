import { useUploadPhoto } from '@api/photo/hooks/useUploadPhoto';
import { ModalPageComponent } from '@components/UI/ModalPage/ModalPageComponent';
import { PostCreateComponent } from '@components/UI/Post/PostCreateComponent';
import { useAction } from '@hooks/useActions';
import { useAppSelector } from '@hooks/useAppSelector';
import { useRouterPopout } from '@hooks/useRouterPopout';
import { ModalInterface } from '@routes/interface/modal.interface';
import { PopoutTypes } from '@routes/structure.popout';
import { postCreateActions } from '@store/post/post.create.slice';
import { Icon48WritebarSend } from '@vkontakte/icons';
import { ModalPageProps, PanelHeaderButton } from '@vkontakte/vkui';
import { FC, useEffect, useState } from 'react';

const PostCreateModal: FC<ModalInterface & ModalPageProps> = ({
  onClose,
  nav,
  ...properties
}) => {
  const { pushParameter } = useRouterPopout();
  const postCreate = useAction(postCreateActions);
  const text = useAppSelector((state) => state.postCreate.text);
  const [photo, setPhoto] = useState<File | null>();
  const { mutateAsync } = useUploadPhoto();

  useEffect(() => {
    return () => {
      postCreate.reset();
    };
  }, []);

  const isDisableSend = !photo && text.replace(/\s+/g, ' ').trim().length < 5;

  const onCloseConfirm = () => {
    if (!photo && !text) return onClose();
    pushParameter('popout', PopoutTypes.ConfirmWindowClose);
  };

  const onSubmit = async () => {
    const formData = new FormData();
    if (photo) formData.append('photo', photo);

    try {
      const upload = await mutateAsync(formData);
    } catch (error) {
      console.error(error);
    }

    console.log(photo);
    console.log(text);
  };

  return (
    <ModalPageComponent
      nav={nav}
      name={'Создание записи'}
      onClose={onCloseConfirm}
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
