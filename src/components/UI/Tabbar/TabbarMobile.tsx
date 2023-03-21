import { LayoutButton } from '@components/UI/Button';
import { ViewTypes } from '@routes/structure.navigate';
import { Icon28Flash, Icon28NewsfeedOutline } from '@vkontakte/icons';
import { Tabbar } from '@vkontakte/vkui';
import { FC } from 'react';

export const TabbarMobile: FC = () => {
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
