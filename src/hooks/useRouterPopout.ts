import { back, push, replace, useParams } from '@itznevikat/router';
import { ModalTypes } from '@routes/structure.modal';
import { PopoutTypes } from '@routes/structure.popout';
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
 * ЧТобы поддержать работу старых методов вызова роутера, будет передаваться параметр urlParams в мету
 */
const isTestUPVersionRouter = true;
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
  /**
   * добавляем к параметрам страницы (урл) новые параметры, без перезаписи
   * @param key
   * @param value
   * @param urlParameters
   * @param meta
   * @param isDeleteModalOrPopout - если необходимо удалить открытое противоположное действие
   * @example pushParameter('modal', 'yest', {}, {}, true) - будет удален popout
   */
  const pushParameter = <
    K extends 'modal' | 'popout',
    V extends PushableValue<K>,
  >(
    key: K,
    value: V,
    urlParameters = {},
    meta = {},
    isDeleteModalOrPopout = false,
  ): void => {
    const activeParametersUrlCopy: IParametersMetaRouter = Object.assign({
      ...activeParametersUrl,
      ...urlParameters,
    });

    activeParametersUrlCopy[key] = value;
    if (isDeleteModalOrPopout) {
      delete activeParametersUrlCopy[key === 'popout' ? 'modal' : 'popout'];
    }
    const newMeta = isTestUPVersionRouter
      ? Object.assign(meta, urlParameters)
      : meta;

    const newParameter =
      `?` + new URLSearchParams(activeParametersUrlCopy).toString();

    return push(newParameter, newMeta);
  };

  const replaceParameter = <
    K extends 'modal' | 'popout',
    V extends PushableValue<K>,
  >(
    key: K,
    value: V,
    urlParameters = {},
    meta = {},
  ): void => {
    const activeParametersUrlCopy: IParametersMetaRouter = Object.assign({
      ...activeParametersUrl,
      ...urlParameters,
    });

    const newMeta = isTestUPVersionRouter
      ? Object.assign(meta, urlParameters)
      : meta;
    activeParametersUrlCopy[key] = value;

    const newParameter =
      `?` + new URLSearchParams(activeParametersUrlCopy).toString();

    return replace(newParameter, newMeta);
  };

  const removeParameter = <K extends TypeKeyElementClose>(
    key: K,
    urlParameters = {},
    meta = {},
  ): void => {
    const activeParametersUrlCopy: IParametersMetaRouter = Object.assign({
      ...activeParametersUrl,
      ...urlParameters,
    });

    delete activeParametersUrlCopy[key];

    const newParameter =
      `?` + new URLSearchParams(activeParametersUrlCopy).toString();

    return replace(newParameter, meta);
  };

  return useMemo(() => {
    return {
      pushParameter,
      closeElement,
      replaceParameter,
      removeParameter,
    };
  }, [activeParametersUrl]);
};
