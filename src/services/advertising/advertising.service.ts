import bridge, { EAdsFormats, BannerAdLocation } from '@vkontakte/vk-bridge';

export const advertisingService = {
  /**
   * Проверка наличия рекламы
   */
  check: async (type: EAdsFormats) => {
    return bridge
      .send('VKWebAppCheckNativeAds', {
        ad_format: type,
      })
      .then((data) => {
        return data.result;
      })
      .catch((error) => {
        // console.log(error);
        return false;
      });
  },
  show: async (type: EAdsFormats) => {
    const checkAd = await advertisingService.check(type);
    if (!checkAd) return;
    return bridge
      .send('VKWebAppShowNativeAds', {
        ad_format: type /* Тип рекламы */,
      })
      .then((data) => {
        if (data.result) {
          // Реклама была показана
          // console.log(data);
          return true;
        } else {
          throw new Error('Ошибка показа');
          // Ошиб
        }
      })
      .catch((error) => {
        // console.log(error);
        throw new Error('Ошибка показа');
      });
  },
  /**
   * Показ баннера снизу экрана
   */
  showBanner: async () => {
    bridge
      .send('VKWebAppShowBannerAd', {
        banner_location: BannerAdLocation.BOTTOM,
      })
      .then((data) => {
        if (data.result) {
          // Баннерная реклама отобразилась
        }
      })
      .catch((error) => {
        // Ошибка
        console.log(error);
      });
  },

  checkOpenBanner: async () => {
    return bridge.send('VKWebAppCheckBannerAd');
  },
};
