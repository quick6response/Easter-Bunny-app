import { LayoutButton } from '@components/UI/Button';
import { useAppSelector } from '@hooks/useAppSelector';
import { ViewTypes } from '@routes/structure.navigate';
import {
  Icon28Flash,
  Icon28LikeFillRed,
  Icon28NewsfeedOutline,
} from '@vkontakte/icons';
import { Tabbar, usePlatform } from '@vkontakte/vkui';
import { Platform } from '@vkontakte/vkui/dist/lib/platform';
import { FC } from 'react';

export const TabbarMobile: FC = () => {
  const platform = usePlatform();
  const isAdmin = useAppSelector((state) => state.user.admin);
  if (platform === Platform.VKCOM) return null;

  return (
    <Tabbar mode="vertical">
      <LayoutButton story={ViewTypes.HOME} before={<Icon28NewsfeedOutline />}>
        Главная
      </LayoutButton>
      <LayoutButton story={ViewTypes.PROFILE} before={<Icon28Flash />}>
        Профиль
      </LayoutButton>
      {isAdmin && (
        <LayoutButton story={ViewTypes.ADMIN} before={<Icon28LikeFillRed />}>
          Модерация
        </LayoutButton>
      )}
    </Tabbar>
  );
};
