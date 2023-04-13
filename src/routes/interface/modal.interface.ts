import { ModalTypes } from '@routes/structure.modal';
import { ModalPageProps } from '@vkontakte/vkui';

export interface ModalInterface extends Omit<ModalPageProps, 'onClose'> {
  nav: ModalTypes;
  onClose: () => void;
}
