import { VkSlidesService } from '@services/vk/vk.slides.service';
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
        Добавить кнопку нашего сервиса в свой профиль
      </CellButton>
      <CellButton onClick={() => VkSlidesService.delete()}>
        Очистить слайды о новых версиях{' '}
      </CellButton>
    </Group>
  );
};
