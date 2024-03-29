import { useQueryClient } from '@tanstack/react-query';
import bridge from '@vkontakte/vk-bridge';
import { ErrorData } from '@vkontakte/vk-bridge/dist/types/src/types/bridge';
import { useCallback, useState } from 'react';

export const usePinPostUser = (postId: string, hash: string) => {
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('Ошибка покупки.');
  const onClickBuy = useCallback(
    async (itemId: string) => {
      setIsLoading(true);
      return bridge
        .send('VKWebAppShowOrderBox', {
          type: 'item', // Всегда должно быть 'item'
          item: `${itemId}-${postId}`, // Идентификатор товара
        })
        .then((result) => {
          console.log('покупка состоялась', result);
          queryClient.invalidateQueries(['posts', hash]);
          queryClient.invalidateQueries(['my']);
          return true;
        })
        .catch((error_: ErrorData) => {
          console.error('Ошибка покупки', error_);
          setError('Возможно Вы отменили покупку или запись уже закреплена.');
          return false;
        })
        .finally(() => {
          setIsLoading(false);
        });
    },
    [postId],
  );

  return { onClickBuy, isLoading, error };
};
