import { ModalPageComponent } from '@components/UI/ModalPage/ModalPageComponent';
import { PostCreateComponent } from '@components/UI/Post/PostCreateComponent';
import { useAppSelector } from '@hooks/useAppSelector';
import { ModalInterface } from '@routes/interface/modal.interface';
import { Icon48WritebarSend } from '@vkontakte/icons';
import { ModalPageProps, PanelHeaderButton } from '@vkontakte/vkui';
import { FC, useState } from 'react';

const PostCreateModal: FC<ModalInterface & ModalPageProps> = ({
  onClose,
  nav,
  ...properties
}) => {
  const text = useAppSelector((state) => state.postCreate.text);
  const [photo, setPhoto] = useState<File | null>();

  const isDisableSend = text.replace(/\s+/g, ' ').trim().length < 5;

  const onSubmit = () => {
    console.log(photo);
    console.log(text);
  };

  return (
    <ModalPageComponent
      nav={nav}
      name={'Создание записи'}
      onClose={onClose}
      before={
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
