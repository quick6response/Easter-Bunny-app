import { useSnackbar } from '@hooks/useSnackbar';
import { tapticSendSignal } from '@services/taptic-mobile/taptic.service';
import {
  Icon20CancelCircleFillRed,
  Icon20CheckCircleFillGreen,
} from '@vkontakte/icons';
import { Snackbar as SnackbarVK, SnackbarProps } from '@vkontakte/vkui';
import { FC } from 'react';
import './snackbar.css';

type TSnackbarProperties = Omit<SnackbarProps, 'onClose'>;

export const Snackbar: FC<TSnackbarProperties> = ({
  children,
  style,
  before,
  ...rest
}) => {
  const { setSnackbar } = useSnackbar();

  return (
    <SnackbarVK
      layout="horizontal"
      before={before}
      onClose={() => setSnackbar(null)}
      {...rest}
    >
      {children}
    </SnackbarVK>
  );
};

export const SuccessSnackbar: FC<TSnackbarProperties> = ({
  children,
  ...rest
}) => {
  tapticSendSignal('success');
  return (
    <Snackbar
      before={<Icon20CheckCircleFillGreen width={24} height={24} />}
      duration={3000}
      {...rest}
    >
      {children}
    </Snackbar>
  );
};

export const ErrorSnackbar: FC<TSnackbarProperties> = ({
  children,
  ...rest
}) => {
  tapticSendSignal('error');
  return (
    <Snackbar
      before={<Icon20CancelCircleFillRed width={24} height={24} />}
      duration={4000}
      {...rest}
    >
      {children}
    </Snackbar>
  );
};
