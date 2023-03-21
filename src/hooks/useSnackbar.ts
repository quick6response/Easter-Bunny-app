import { SnackbarContext } from '@components/UI/Snackbar/SnackbarContext';
import { useContext } from 'react';

export const useSnackbar = () => useContext(SnackbarContext);
