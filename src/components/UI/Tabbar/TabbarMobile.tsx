import { LayoutButton } from '@components/UI/Button';
import { ViewTypes } from '@routes/structure.navigate';
import { Icon28Flash, Icon28NewsfeedOutline } from '@vkontakte/icons';
import { Tabbar, usePlatform } from '@vkontakte/vkui';
import { Platform } from '@vkontakte/vkui/dist/lib/platform';
import { FC } from 'react';

export const TabbarMobile: FC = () => {
  const platform = usePlatform();
  if (platform === Platform.VKCOM) return null;

  return (
    <Tabbar mode="vertical">
      <LayoutButton story={ViewTypes.HOME} before={<Icon28NewsfeedOutline />}>
        Главная
      </LayoutButton>
      <LayoutButton story={ViewTypes.PROFILE} before={<Icon28Flash />}>
        Профиль
      </LayoutButton>
    </Tabbar>
  );
};
