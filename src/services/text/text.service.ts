import { tapticSendSignal } from '@services/taptic-mobile/taptic.service';
import bridge from '@vkontakte/vk-bridge';

const KEY_LOG = 'textService';
/**
 * Сервис для работы с текстом
 */
export const textService = {
  copyTextAndTapticSignal: (text: string) => {
    tapticSendSignal('success');
    textService.copy(text);
  },
  copyText: (text: string) => {
    textService.copy(text);
  },
  copy: (text: string) => {
    try {
      console.debug(`Скопировали текст: ${text}`);
      bridge.send('VKWebAppCopyText', {
        text: text,
      });
    } catch (error) {
      console.error(
        `${KEY_LOG}.copyTextAndTapticSignal: ${JSON.stringify(error)}`,
      );
    }
  },
};
