import { AxiosError } from 'axios';

export const errorTransformService = {
  getMessageError: (error: unknown): string => {
    try {
      if (error instanceof AxiosError) {
        console.log(error.response);
        return error.response?.data.message ?? error.response?.statusText;
      }
      return 'Не удалось определить текст ошибки..';
    } catch (error_) {
      console.error(error_);
      return 'Не удалось определить текст ошибки, посмотрите логи.';
    }
  },
};
