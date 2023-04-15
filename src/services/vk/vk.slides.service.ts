import { SlidesModel } from '@models/slides.model';
import { vkStorageService } from '@services/vk/vk.storage.service';
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

  delete: () => {
    for (let index = 0; index < 2; index += 0.1) {
      vkStorageService
        .delete(`version_app_${index.toFixed(1)}`)
        .then(() =>
          console.log(`Удалили слайд: version_app_${index.toFixed(1)}`),
        );
    }
  },
};
