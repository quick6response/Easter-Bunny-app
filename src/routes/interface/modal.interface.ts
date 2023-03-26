import { ModalTypes } from '@routes/structure.modal';

export interface ModalInterface {
  nav: ModalTypes;
  onClose: () => void;
}
