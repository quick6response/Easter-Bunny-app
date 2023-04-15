import { ModalInterface } from '@routes/interface/modal.interface';
import { Icon56LocationPin } from '@vkontakte/icons';
import { Button, ButtonGroup, ModalCard } from '@vkontakte/vkui';
import { FC } from 'react';

export const PostPinInfoModalCard: FC<ModalInterface> = ({ nav, onClose }) => {
  return (
    <ModalCard
      id={nav}
      onClose={onClose}
      icon={<Icon56LocationPin />}
      header="Ух ты, этот пост..."
      subheader={
        'Этот пост закреплен и зарабатывает дополнительные лайки. Вы можешь также!'
      }
      actions={
        <ButtonGroup mode="horizontal" stretched>
          <Button>Подробнее</Button>
        </ButtonGroup>
      }
    ></ModalCard>
  );
};
