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
import { FC, PropsWithChildren, useRef } from 'react';

export const PanelHeaderTabs: FC<PropsWithChildren> = ({ children }) => {
  const wallPanelAction = useAction(wallPanelSliceActions);
  const platform = usePlatform();
  const activeTab = useAppSelector((state) => state.wallPanel.tab);
  const { pushParameter } = useRouterPopout();

  const clickTimeout = useRef<null | NodeJS.Timeout>(null);
  const lastClickTime = useRef(0);

  const { viewWidth } = useAdaptivityConditionalRender();

  const onClickTab = (tab: THomeTab) => {
    if (activeTab === tab) {
      const currentTime = Date.now();
      const interval = currentTime - lastClickTime.current;
      if (interval <= 200) {
        if (clickTimeout.current) clearTimeout(clickTimeout?.current);
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      } else {
        clickTimeout.current = setTimeout(() => {
          if (clickTimeout.current) clearTimeout(clickTimeout.current);
        }, 200);
      }
      lastClickTime.current = currentTime;
      return;
    }
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    return wallPanelAction.setTab(tab);
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
