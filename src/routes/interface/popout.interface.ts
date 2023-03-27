import { PopoutTypes } from '@routes/structure.popout';

export interface PopoutInterface {
  nav: PopoutTypes;
  onClose: () => void;
}
