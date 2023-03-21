import { FC, ReactNode, useState } from 'react';

import { SnackbarContext } from './SnackbarContext';

type SnackbarProviderProperties = {
  children: ReactNode;
};

export const SnackbarProvider: FC<SnackbarProviderProperties> = ({
  children,
}) => {
  const [snackbar, setSnackbar] = useState<ReactNode | null>(null);

  return (
    <SnackbarContext.Provider value={{ snackbar, setSnackbar }}>
      {children}
    </SnackbarContext.Provider>
  );
};
