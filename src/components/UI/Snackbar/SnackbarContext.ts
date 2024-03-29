import { createContext, ReactNode } from 'react';

export const SnackbarContext = createContext<{
  snackbar: ReactNode;
  setSnackbar: (snackbar: ReactNode) => void;
}>({
  snackbar: null,
  setSnackbar: () => void 0,
});
