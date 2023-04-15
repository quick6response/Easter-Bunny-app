import { advertisingConfig } from '@config/advertising.config';
import { useAction } from '@hooks/useActions';
import { useAppSelector } from '@hooks/useAppSelector';
import { useRouterPopout } from '@hooks/useRouterPopout';
import { back } from '@itznevikat/router';
import { advertisingService } from '@services/advertising/advertising.service';
import { advertisingSliceActions } from '@store/advertising/advertising.slice';
import { EAdsFormats } from '@vkontakte/vk-bridge';
import { AlertsConfigEnum } from '../modals/alerts.config';

export const useAdvertisingShow = () => {
  const lastDate = useAppSelector((state) => state.advertising.lastViewed);
  const countViewInfoPost = useAppSelector(
    (state) => state.wallPanel.countViewPost,
  );
  const isFirstStart = useAppSelector(
    (state) => state.advertising.isFirstStart,
  );
  const advertisingSliceAction = useAction(advertisingSliceActions);
  const { replaceParameter, pushParameter } = useRouterPopout();

  const show = async () => {
    // проверка числа на кратной и последний просмотр
    if (
      countViewInfoPost % advertisingConfig.countPostInfo === 0 &&
      Date.now() > lastDate + advertisingConfig.timeBetweenViewings
    ) {
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

      pushParameter('popout', AlertsConfigEnum.ScreenSpinner);

      setTimeout(() => {
        advertisingService
          .show(EAdsFormats.INTERSTITIAL)
          .then(() => {
            advertisingSliceAction.setLastViewDate({ date: Date.now() });
            return back();
          })
          .catch(() => {
            return back();
          });
      }, 2000);
    }
  };

  return {
    show,
  };
};
