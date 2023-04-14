import { TabsTypeWallComponent } from '@components/UI/Tabs/TabsTypeWallComponent';
import { useAction } from '@hooks/useActions';
import { useAppSelector } from '@hooks/useAppSelector';
import { useRouterPopout } from '@hooks/useRouterPopout';
import { ModalsElement } from '@routes/structure.modal';
import { THomeTab, wallPanelSliceActions } from '@store/wall/wall.panel.slice';
import { Icon24Add } from '@vkontakte/icons';
import {
  Div,
  FixedLayout,
  PanelHeader,
  PanelHeaderButton,
  Platform,
  useAdaptivityConditionalRender,
  usePlatform,
} from '@vkontakte/vkui';
import { FC, PropsWithChildren } from 'react';

export const PanelHeaderTabs: FC<PropsWithChildren> = ({ children }) => {
  const wallPanelAction = useAction(wallPanelSliceActions);
  const platform = usePlatform();
  const activeTab = useAppSelector((state) => state.wallPanel.tab);
  const { pushParameter } = useRouterPopout();
  const { viewWidth } = useAdaptivityConditionalRender();

  const onClickTab = (tab: THomeTab) => {
    if (activeTab === tab) return;
    wallPanelAction.setTab(tab);
  };

  if (platform === Platform.VKCOM)
    return (
      <>
        <FixedLayout vertical="top">
          <PanelHeader
            separator={false}
            before={
              <PanelHeaderButton aria-label="Открыть окно создание записи">
                <Icon24Add
                  onClick={() =>
                    pushParameter('modal', ModalsElement.POST_CREATE)
                  }
                />
              </PanelHeaderButton>
            }
          >
            <TabsTypeWallComponent onClick={onClickTab} select={activeTab} />
          </PanelHeader>
        </FixedLayout>
        <Div style={{ height: 38 }} />
        {children}
      </>
    );

  return (
    <>
      <PanelHeader
        separator={false}
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
      {children}
    </>
  );
};
