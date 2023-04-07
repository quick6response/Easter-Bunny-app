import {SlidesModel} from '@models/slides.model';
import {vkStorageService} from '@services/vk/vk.storage.service';
import bridge from '@vkontakte/vk-bridge';

export const VkSlidesService = {
  show: async (version: string, slides: SlidesModel[]) => {
    return bridge
      .send('VKWebAppShowSlidesSheet', {
        slides: slides,
      })
      .then(async (data) => {
        if (data.result) {
          // Слайды показаны
          await vkStorageService.create({
            key: `version_app_${version}`,
            value: { isView: true },
          });
          return data;
        }
      })
      .catch((error) => {
        // Ошибка
        console.log(error);
        return error;
      });
  },
};
