import bridge from '@vkontakte/vk-bridge';
import { TapticNotificationType } from '@vkontakte/vk-bridge/dist/types/src/types/data';

/**
 * @description Сервис по работе с таптиками (тактильная отдача на устройстве)
 * @param status
 */
export const tapticSendSignal = (status: TapticNotificationType) => {
  // проверка на поддержку таптиков
  if (bridge.supports('VKWebAppTapticNotificationOccurred'))
    bridge
      .send('VKWebAppTapticNotificationOccurred', {
        type: status,
      })
      .then((r) => r);
};
