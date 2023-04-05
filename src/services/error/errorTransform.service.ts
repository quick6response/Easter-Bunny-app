import { AxiosError } from 'axios';

export const errorTransformService = {
  getMessageError: (error: unknown): string => {
    try {
      if (error instanceof AxiosError) {
        return error.response?.data.message ?? error.response?.statusText;
      }
      return 'Не удалось определить текст ошибки, посмотрите логи.';
    } catch (error_) {
      console.error(error_);
      return 'Не удалось определить текст ошибки, посмотрите логи.';
    }
  },
};
