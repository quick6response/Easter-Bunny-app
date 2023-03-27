import { back, push, useParams } from '@itznevikat/router';
import { useMemo } from 'react';

type TypeKeyElementClose = 'modal' | 'popout';

interface IParametersMetaRouter {
  popout?: string;
  modal?: string;
  [key: string]: any;
}

const closeElement = () => {
  back();
};
/**
 * Хук для работы с попаутами
 */
export const useRouterPopout = () => {
  const activeParametersUrl = useParams<IParametersMetaRouter>();
  // добавляем к параметрам страницы (урл) новые параметры, без перезаписи
  const pushParameter = (
    key: TypeKeyElementClose,
    value: string,
    meta = {},
  ): void => {
    const activeParametersUrlCopy: IParametersMetaRouter =
      Object.assign(activeParametersUrl);

    // if (activeParametersUrlCopy?.modal || activeParametersUrlCopy?.popout) {
    //   delete activeParametersUrlCopy.modal;
    //   delete activeParametersUrlCopy.popout;
    // }
    activeParametersUrlCopy[key] = value;

    const newParameter =
      `?` + new URLSearchParams(activeParametersUrlCopy).toString();

    return push(newParameter, meta);
  };

  return useMemo(() => {
    return {
      pushParameter,
      closeElement,
    };
  }, [activeParametersUrl]);
};
