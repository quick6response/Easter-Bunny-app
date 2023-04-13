import {back, push, useParams} from '@itznevikat/router';
import {ModalTypes} from '@routes/structure.modal';
import {PopoutTypes} from '@routes/structure.popout';
import {useMemo} from 'react';

type TypeKeyElementClose = 'modal' | 'popout';

interface IParametersMetaRouter {
  popout?: string;
  modal?: string;
  [key: string]: any;
}

const closeElement = () => {
  back();
};

// Запрет на выбор несуществующих
type PushableValue<K extends 'modal' | 'popout'> = K extends 'modal'
  ? ModalTypes
  : K extends 'popout'
  ? PopoutTypes
  : never;
/**
 * Хук для работы со всплывающими окнами
 */
export const useRouterPopout = () => {
  const activeParametersUrl = useParams<IParametersMetaRouter>();
  // добавляем к параметрам страницы (урл) новые параметры, без перезаписи
  const pushParameter = <
    K extends 'modal' | 'popout',
    V extends PushableValue<K>,
  >(
    key: K,
    value: V,
    meta = {},
  ): void => {
    const activeParametersUrlCopy: IParametersMetaRouter =
      Object.assign(activeParametersUrl);

    activeParametersUrlCopy[key] = value;

    const newParameter =
      `?` + new URLSearchParams(activeParametersUrlCopy).toString();

    return push(newParameter, meta);
  };

  return useMemo(() => {
    return {
      pushParameter,
      closeElement,
      // bachAndReplace,
    };
  }, [activeParametersUrl]);
};
