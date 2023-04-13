import { TabsTypeWallComponent } from '@components/UI/Tabs/TabsTypeWallComponent';
import { useAction } from '@hooks/useActions';
import { useAppSelector } from '@hooks/useAppSelector';
import { useRouterPopout } from '@hooks/useRouterPopout';
import { ModalsElement } from '@routes/structure.modal';
import { THomeTab, wallPanelSliceActions } from '@store/wall/wall.panel.slice';
import { Icon24Add } from '@vkontakte/icons';
import { PanelHeader, PanelHeaderButton } from '@vkontakte/vkui';
import { FC, PropsWithChildren } from 'react';

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
              onClick={() => pushParameter('modal', ModalsElement.POST_CREATE)}
            />
          </PanelHeaderButton>
        }
      >
        <TabsTypeWallComponent onClick={onClickTab} select={activeTab} />
      </PanelHeader>
    </>
  );
};
