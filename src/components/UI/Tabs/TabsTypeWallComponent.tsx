import { THomeTab } from '@store/wall/wall.panel.slice';
import { Icon24Done } from '@vkontakte/icons';
import { HorizontalScroll, SimpleCell, Tabs, TabsItem } from '@vkontakte/vkui';
import { FC, ReactNode } from 'react';

export interface WallTypeElementInterface {
  name: string;
  tab: THomeTab;
  icon?: ReactNode;
}

export const TabsTypeWallComponent: FC<{
  onClick: (type: THomeTab) => void;
  select: string;
  mode?: 'cell' | 'tabs';
  tabs: WallTypeElementInterface[];
}> = ({ select, onClick, mode = 'tabs', tabs }) => {
  if (mode === 'cell') {
    return (
      <>
        {tabs.map((tab) => (
          <SimpleCell
            key={tab.tab}
            selected={tab.tab === select}
            before={tab.icon}
            onClick={() => onClick(tab.tab)}
            after={
              tab.tab === select ? (
                <Icon24Done fill="var(--vkui--color_icon_accent)" />
              ) : null
            }
          >
            {tab.name}
          </SimpleCell>
        ))}
      </>
    );
  }

  return (
    <Tabs mode="accent">
      <HorizontalScroll arrowSize="l" showArrows="always">
        {tabs.map((tab) => (
          <TabsItem
            key={tab.tab}
            selected={tab.tab === select}
            before={tab.icon}
            onClick={() => onClick(tab.tab)}
          >
            {tab.name}
          </TabsItem>
        ))}
      </HorizontalScroll>
    </Tabs>
  );
};
