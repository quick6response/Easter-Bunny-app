import bridge from '@vkontakte/vk-bridge';
import { CellButton, Group } from '@vkontakte/vkui';
import { FC } from 'react';

const onClickAddButtonProfile = () => {
  return bridge.send('VKWebAppAddToProfile', {
    ttl: new Date('23.04.2023:23:59').getTime(),
  });
};

export const ProfileSettingComponent: FC = () => {
  return (
    <Group>
      <CellButton onClick={() => onClickAddButtonProfile()} multiline>
        Добавить кнопку в своей профиль
      </CellButton>
      <CellButton multiline>
        Включить уведомления от сервиса о активности
      </CellButton>
      <CellButton multiline>
        Включить уведомления от сообщества, если хотите видеть сообщения от бота
      </CellButton>
    </Group>
  );
};
