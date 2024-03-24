import bridge from '@vkontakte/vk-bridge';

const KEY_LOG_SERVICE = 'VkStorageService';
export const vkStorageService = {
  // получение значения по ключу
  getValue: async <T>(key: string): Promise<T | null> => {
    try {
      const transformKey = vkStorageService.getKey(key);
      const getValueStorage = await bridge.send('VKWebAppStorageGet', {
        keys: [transformKey],
      });
      const findCurrentValue = getValueStorage?.keys?.find(
        (storage) => storage.key === transformKey,
      );
      if (!findCurrentValue) return null;

      return JSON.parse(findCurrentValue.value) as T;
    } catch {
      // console.error(
      //   `${KEY_LOG_SERVICE} Ошибка при получение записи по ключу ${key}.`,
      //   error,
      // );
      return null;
    }
  },
  // создание записи
  create: async ({ key, value }: { key: string; value: unknown }) => {
    try {
      const valueString = JSON.stringify(value);
      return await bridge.send('VKWebAppStorageSet', {
        key: vkStorageService.getKey(key),
        value: valueString,
      });
    } catch (error) {
      console.error(`${KEY_LOG_SERVICE} Ошибка при создании записи.`, error);
      throw new Error(`${KEY_LOG_SERVICE} Ошибка при создание записи.`);
    }
  },
  // удаление записи
  delete: async (key: string): Promise<boolean> => {
    const deleteValueAndKey = await bridge.send('VKWebAppStorageSet', {
      key: vkStorageService.getKey(key),
      value: '',
    });
    return deleteValueAndKey.result;
  },

  getKey: (key: string) => {
    return key.replaceAll('.', '_');
  },
  // создание временной записи
};
