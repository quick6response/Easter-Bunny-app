import { advertisingConfig } from '@config/advertising.config';
import { useAction } from '@hooks/useActions';
import { useAppSelector } from '@hooks/useAppSelector';
import { useRouterPopout } from '@hooks/useRouterPopout';
import { back, block } from '@itznevikat/router';
import { advertisingService } from '@services/advertising/advertising.service';
import { advertisingSliceActions } from '@store/advertising/advertising.slice';
import { EAdsFormats } from '@vkontakte/vk-bridge';
import { AlertsConfigEnum } from '../modals/alerts.config';

export const useAdvertisingShow = () => {
  const lastDate = useAppSelector((state) => state.advertising.lastViewed);
  const countViewInfoPost = useAppSelector(
    (state) => state.wallPanel.countViewPost,
  );
  const countViewProfile = useAppSelector(
    (state) => state.wallPanel.countViewProfile,
  );
  const isFirstStart = useAppSelector(
    (state) => state.advertising.isFirstStart,
  );
  const advertisingSliceAction = useAction(advertisingSliceActions);
  const { replaceParameter, pushParameter } = useRouterPopout();

  const privateShow = () => {
    pushParameter('popout', AlertsConfigEnum.ScreenSpinner);
    const unblock = block(() => void 0);

    setTimeout(() => {
      console.log('Вызываем показ рекламы');
      advertisingService
        .show(EAdsFormats.INTERSTITIAL)
        .then(() => {
          advertisingSliceAction.setLastViewDate({ date: Date.now() });
        })
        .catch(() => {})
        .finally(() => {
          console.log('Выходим назад');
          // setTimeout(() => {
          unblock();
          console.log('Разблокировали интерфейс');
          // }, 2000);
          // back();
          return back();
        });
    }, 1000);
  };

  const showProfile = async () => {
    if (
      countViewProfile !== 0 &&
      countViewProfile % advertisingConfig.countProfile === 0
    ) {
      console.log(`четное ${advertisingConfig.countProfile} число, идем вниз`);
      const checkAds = await advertisingService.check(EAdsFormats.INTERSTITIAL);
      if (!checkAds) {
        console.log('Рекламы нет');
        return;
      }

      console.log('Реклама за просмотр профиля, включаю спиннер');
      return privateShow();
    }
  };

  const show = async () => {
    // проверка числа на кратной и последний просмотр
    console.log(
      'Вызван метод',
      lastDate + advertisingConfig.timeBetweenViewings,
      Date.now(),
    );
    if (
      countViewInfoPost % advertisingConfig.countPostInfo === 0 &&
      Date.now() > lastDate + advertisingConfig.timeBetweenViewings
    ) {
      console.log('Мы в условие');
      // проверка на хеш при запуске
      if (isFirstStart) {
        console.log('Первый запуск, показывать рекламу нельзя');
        return advertisingSliceAction.seIsFirstStart(false);
      }
      const checkAds = await advertisingService.check(EAdsFormats.INTERSTITIAL);
      if (!checkAds) {
        // обновялем баннер если прошло н постов
        if (countViewInfoPost > advertisingConfig.countPostForBanner) {
          const checkBanner = await advertisingService.checkOpenBanner();
          if (!checkBanner.result) {
            console.log('Баннер закрыт, открываю новый');
            await advertisingService.showBanner();
          }
        }
        return;
      }
      console.log('Реклама есть, включаю спиннер');
      return privateShow();
    }
  };

  const showPostCreate = async () => {
    const checkAds = await advertisingService.check(EAdsFormats.INTERSTITIAL);
    if (!checkAds) return;
    console.log('Реклама есть, включаю спиннер');
    return privateShow();
  };
  return {
    show,
    showProfile,
    showPostCreate,
  };
};
