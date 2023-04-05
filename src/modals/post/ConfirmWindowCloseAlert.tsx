import { PopoutInterface } from '@routes/interface/popout.interface';
import { Alert } from '@vkontakte/vkui';
import { FC } from 'react';

export const ConfirmWindowCloseAlert: FC<PopoutInterface> = ({ onClose }) => {
  return (
    <Alert
      actions={[
        {
          title: 'Вернуться',
          autoClose: true,
          mode: 'cancel',
        },
        {
          title: 'Закрыть',
          mode: 'destructive',
          action: () => {
            // для выхода из алерта и модальной карточки
            onClose();
            onClose();
          },
        },
      ]}
      actionsLayout="horizontal"
      onClose={() => {
        onClose();
      }}
      header="У Вас есть несохраненные данные"
      text="Если Вы выйдете, они будут удалены."
    />
  );
};
