import { ActionCreatorsMapObject, bindActionCreators } from '@reduxjs/toolkit';
import { AppDispatch } from '@store/types';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();

export const useActionCreators = <Actions extends ActionCreatorsMapObject>(
  actions: Actions,
) => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(actions, dispatch), []);
};
