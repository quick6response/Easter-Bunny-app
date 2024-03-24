import {
  TabsTypeWallComponent,
  WallTypeElementInterface,
} from '@components/UI/Tabs/TabsTypeWallComponent';
import { useAction } from '@hooks/useActions';
import { useAppSelector } from '@hooks/useAppSelector';
import { useRouterPopout } from '@hooks/useRouterPopout';
import { ModalsElement } from '@routes/structure.modal';
import { THomeTab, wallPanelSliceActions } from '@store/wall/wall.panel.slice';
import {
  Icon16Camera,
  Icon16Crown,
  Icon16HistoryBackwardOutline,
  Icon16ThumbsUpOutline,
  Icon24Add,
} from '@vkontakte/icons';
import {
  Div,
  FixedLayout,
  Group,
  PanelHeader,
  PanelHeaderButton,
  Platform,
  useAdaptivityConditionalRender,
  usePlatform,
} from '@vkontakte/vkui';
import { FC, Fragment, PropsWithChildren, useRef } from 'react';

const allTabs: WallTypeElementInterface[] = [
  {
    name: 'Все записи',
    tab: 'all',
    icon: <Icon16HistoryBackwardOutline />,
  },
  {
    name: 'Популярное',
    tab: 'top',
    icon: <Icon16ThumbsUpOutline />,
  },
  {
    name: 'Сделала AI',
    tab: 'ai',
    icon: <Icon16Camera />,
  },
  {
    name: 'Закрепленные',
    tab: 'pin',
    icon: <Icon16Crown />,
  },
];

export const PanelHeaderTabsExample: FC<PropsWithChildren> = ({ children }) => {
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
      if (interval <= 150) {
        if (clickTimeout.current) clearTimeout(clickTimeout?.current);
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth',
        });
      } else {
        clickTimeout.current = setTimeout(() => {
          if (clickTimeout.current) clearTimeout(clickTimeout.current);
        }, 150);
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
            Ленточка
          </PanelHeader>
          <Group>
            <TabsTypeWallComponent
              onClick={onClickTab}
              select={activeTab}
              tabs={allTabs}
            />
          </Group>
        </FixedLayout>
        <Div style={{ height: 90 }} />
        {children}
      </>
    );

  return (
    <>
      <PanelHeader
        separator={false}
        before={
          <Fragment>
            <PanelHeaderButton aria-label="Открыть окно создание записи">
              <Icon24Add
                onClick={() =>
                  pushParameter('modal', ModalsElement.POST_CREATE)
                }
              />
            </PanelHeaderButton>
          </Fragment>
        }
      >
        <div onClick={() => onClickTab(activeTab)}>Ленточка</div>
      </PanelHeader>
      {/*// todo нужно зафиксировать элемент в верхней части экрана*/}
      <TabsTypeWallComponent
        onClick={onClickTab}
        select={activeTab}
        tabs={allTabs}
      />
      {children}
    </>
  );
};
