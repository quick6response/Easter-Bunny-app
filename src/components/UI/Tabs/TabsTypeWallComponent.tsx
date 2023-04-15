import { THomeTab } from '@store/wall/wall.panel.slice';
import { Icon16Crown, Icon16ThumbsUpOutline } from '@vkontakte/icons';
import { HorizontalScroll, Tabs, TabsItem } from '@vkontakte/vkui';
import { FC, ReactNode } from 'react';

interface ITabs {
  name: string;
  tab: THomeTab;
  icon?: ReactNode;
}

const allTabs: ITabs[] = [
  {
    name: 'Все',
    tab: 'all',
  },
  {
    name: 'Закрепленные',
    tab: 'pin',
    icon: <Icon16Crown />,
  },
  {
    name: 'Популярное',
    tab: 'top',
    icon: <Icon16ThumbsUpOutline />,
  },
];

export const TabsTypeWallComponent: FC<{
  onClick: (type: THomeTab) => void;
  select: string;
}> = ({ select, onClick }) => {
  return (
    <Tabs mode="accent">
      <HorizontalScroll arrowSize="l" showArrows="always">
        {allTabs.map((tab) => (
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
