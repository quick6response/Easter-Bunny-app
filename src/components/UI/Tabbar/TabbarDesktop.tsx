import { LayoutButton } from '@components/UI/Button';
import { ViewTypes } from '@routes/structure.navigate';
import { Icon28NewsfeedOutline, Icon28Profile } from '@vkontakte/icons';
import { Avatar, Group, ImageBase, List, SplitCol } from '@vkontakte/vkui';
import { FC } from 'react';

export const TabbarDesktop: FC = () => {
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
                src={'photo200'}
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
        </List>
      </Group>
    </SplitCol>
  );
};
