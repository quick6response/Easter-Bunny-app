import { LayoutButton } from '@components/UI/Button';
import { useAppSelector } from '@hooks/useAppSelector';
import { ViewTypes } from '@routes/structure.navigate';
import {
  Icon28LikeFillRed,
  Icon28NewsfeedOutline,
  Icon28Profile,
} from '@vkontakte/icons';
import {
  Avatar,
  Group,
  ImageBase,
  List,
  SplitCol,
  usePlatform,
} from '@vkontakte/vkui';
import { Platform } from '@vkontakte/vkui/dist/lib/platform';
import { FC } from 'react';

export const TabbarDesktop: FC = () => {
  const platform = usePlatform();
  const isAdmin = useAppSelector((state) => state.user.admin);
  const userPhoto = useAppSelector((state) => state.user.photo);
  if (platform !== Platform.VKCOM) return null;

  return (
    <SplitCol fixed width="280px" maxWidth="280px">
      <Group>
        <List>
          <LayoutButton
            story={ViewTypes.HOME}
            before={<Icon28NewsfeedOutline />}
          >
            Главная
          </LayoutButton>

          <LayoutButton
            before={
              <Avatar
                src={userPhoto}
                size={28}
                fallbackIcon={
                  <ImageBase
                    fallbackIcon={<Icon28Profile width={16} height={16} />}
                    size={28}
                  />
                }
                withBorder
              />
            }
            story={ViewTypes.PROFILE}
          >
            Профиль
          </LayoutButton>
          {isAdmin && (
            <LayoutButton
              story={ViewTypes.ADMIN}
              before={<Icon28LikeFillRed />}
            >
              Модерация
            </LayoutButton>
          )}
        </List>
      </Group>
      {/*<LayoutsDesktopTopsPost />*/}
    </SplitCol>
  );
};
