import { back, push, useDeserialized, useParams } from '@itznevikat/router';
import { PanelTypes, ViewTypes } from '@routes/structure.navigate';
import { useMemo } from 'react';
import { useSnackbar } from './useSnackbar';

// хук для работы с навигацией
export const useRouterPanel = () => {
  const { setSnackbar } = useSnackbar();
  const { view, panel } = useDeserialized();
  const parametersPage = useParams();
  // метод для возврата на прошлую панель с сохранением вью
  const toBackActiveView = () => {
    setSnackbar(null);
    return back();
  };
  /**
   * Переход между таббами
   * @param story
   */
  const toView = (story: string) => {
    // ± нативное поведение
    if (view === story) {
      if (window.scrollY !== 0) {
        return window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      }
      if (panel !== '/' && panel !== '') return toBackActiveView();
      if (panel === '/') return;
    }
    return push(story);
  };

  // переход на панель из текущей view
  const toPanel = (name: PanelTypes, parameters = {}) => {
    // Записываем в строку переданные параметры в формате key=value
    const parametersKeyAndValue =
      parameters && '?' + new URLSearchParams(parameters).toString();
    push(view + name + parametersKeyAndValue, parameters);
  };

  // переход на панель с параметрами
  const toPanelAndView = (v: ViewTypes, p: PanelTypes, parameters = {}) => {
    // Записываем в строку переданные параметры в формате key=value
    const parametersKeyAndValue =
      parameters && '?' + new URLSearchParams(parameters).toString();
    push(v + p + parametersKeyAndValue, parameters);
  };

  const pushParameterForPanel = (pushParameters: Record<any, any>) => {
    if (Object.keys(pushParameters).length === 0) return;

    const newParameter =
      '?' +
      new URLSearchParams({ ...parametersPage, ...pushParameters }).toString();

    push(newParameter, {
      ...pushParameters,
      parametersPage,
    });
  };

  return useMemo(() => {
    return {
      toView,
      toPanel,
      toBackActiveView,
      toPanelAndView,
      view,
      panel,
      pushParameterForPanel,
    };
  }, [view, panel, parametersPage]);
};
