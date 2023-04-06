import { useAction } from '@hooks/useActions';
import { useAppSelector } from '@hooks/useAppSelector';
import { useRouterPopout } from '@hooks/useRouterPopout';
import { ModalTypes } from '@routes/structure.modal';
import { THomeTab, wallPanelSliceActions } from '@store/wall/wall.panel.slice';
import {
  Icon16Crown,
  Icon16ThumbsUpOutline,
  Icon24Add,
} from '@vkontakte/icons';
import {
  HorizontalScroll,
  PanelHeader,
  PanelHeaderButton,
  Tabs,
  TabsItem,
} from '@vkontakte/vkui';
import { FC, PropsWithChildren, ReactNode } from 'react';

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

export const PanelHeaderTabs: FC<PropsWithChildren> = ({ children }) => {
  const wallPanelAction = useAction(wallPanelSliceActions);
  const activeTab = useAppSelector((state) => state.wallPanel.tab);
  const { pushParameter } = useRouterPopout();

  const onClickTab = (tab: THomeTab) => {
    if (activeTab === tab) return;
    wallPanelAction.setTab(tab);
  };

  return (
    <>
      <PanelHeader
        before={
          <PanelHeaderButton aria-label="Открыть окно создание записи">
            <Icon24Add
              onClick={() => pushParameter('modal', ModalTypes.POST_CREATE)}
            />
          </PanelHeaderButton>
        }
      >
        <Tabs mode="secondary">
          <HorizontalScroll arrowSize="m">
            {allTabs.map((tab) => (
              <TabsItem
                key={tab.tab}
                selected={tab.tab === activeTab}
                before={tab.icon}
                onClick={() => onClickTab(tab.tab)}
              >
                {tab.name}
              </TabsItem>
            ))}
          </HorizontalScroll>
        </Tabs>
      </PanelHeader>
      {children}
    </>
  );
};
