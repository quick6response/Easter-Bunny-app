import bridge, { EAdsFormats } from '@vkontakte/vk-bridge';

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
        console.log(error);
        return false;
      });
  },
  show: async (type: EAdsFormats) => {
    const checkAd = await advertisingService.check(type);
    if (!checkAd) return console.debug('Доступной рекламы нет');
    bridge
      .send('VKWebAppShowNativeAds', {
        ad_format: type /* Тип рекламы */,
      })
      .then((data) => {
        if (data.result) {
          // Реклама была показана
          console.log(data);
        } else {
          // Ошибка
        }
      })
      .catch((error) => {
        console.log(error);
      });
  },
  /**
   * Показ баннера снизу экрана
   */
  showBanner: async () => {
    bridge
      .send('VKWebAppShowBannerAd', {
        banner_location: 'bottom',
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
};
