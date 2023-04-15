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
  const advertisingSliceAction = useAction(advertisingSliceActions);
  const { replaceParameter, pushParameter } = useRouterPopout();
  console.log(countViewInfoPost);
  const show = async () => {
    // проверка числа на кратной и последний просмотр
    if (
      countViewInfoPost % advertisingConfig.countPostInfo === 0 &&
      Date.now() > lastDate + advertisingConfig.timeBetweenViewings
    ) {
      console.log('показываю рекламу');
      const checkAds = advertisingService.check(EAdsFormats.INTERSTITIAL);
      if (!checkAds) await advertisingService.showBanner();
      pushParameter('popout', AlertsConfigEnum.ScreenSpinner);

      setTimeout(() => {
        advertisingService.show(EAdsFormats.INTERSTITIAL).then(() => {
          console.log('Назад идем');
          back();
          return back();
        });
      }, 2000);

      advertisingSliceAction.setLastViewDate({ date: Date.now() });
    }
  };

  return {
    show,
  };
};
