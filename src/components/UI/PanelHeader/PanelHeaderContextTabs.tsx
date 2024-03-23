import {
  ITabs,
  TabsTypeWallComponent,
} from '@components/UI/Tabs/TabsTypeWallComponent';
import { useAction } from '@hooks/useActions';
import { useAppSelector } from '@hooks/useAppSelector';
import { useRouterPopout } from '@hooks/useRouterPopout';
import { ModalsElement } from '@routes/structure.modal';
import { THomeTab, wallPanelSliceActions } from '@store/wall/wall.panel.slice';
import {
  Icon16Crown,
  Icon16Dropdown,
  Icon16HistoryBackwardOutline,
  Icon16ThumbsUpOutline,
  Icon24Add,
  Icon28AddOutline,
} from '@vkontakte/icons';
import {
  Div,
  FixedLayout,
  Group,
  PanelHeader,
  PanelHeaderButton,
  PanelHeaderContent,
  PanelHeaderContext,
  Platform,
  useAdaptivityConditionalRender,
  usePlatform,
} from '@vkontakte/vkui';
import { FC, Fragment, PropsWithChildren, useRef, useState } from 'react';

const allTabs: ITabs[] = [
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
  // {
  //   name: 'Сделала AI',
  //   tab: 'ai',
  //   icon: <Icon16Camera />,
  // },
  {
    name: 'Закрепленные',
    tab: 'pin',
    icon: <Icon16Crown />,
  },
];

const getName = (tab: THomeTab) => {
  switch (tab) {
    case 'all': {
      return 'Все записи';
    }
    case 'top': {
      return 'Популярное';
    }
    case 'ai': {
      return 'Сделала AI';
    }
    case 'pin': {
      return 'Закрепленные';
    }
  }
};

interface PanelHeaderTabsPropertiesInterface {
  onRefresh: () => void;
}

export const PanelHeaderTabs: FC<
  PropsWithChildren<PanelHeaderTabsPropertiesInterface>
> = ({ children }) => {
  const wallPanelAction = useAction(wallPanelSliceActions);
  const platform = usePlatform();
  const activeTab = useAppSelector((state) => state.wallPanel.tab);
  const { pushParameter } = useRouterPopout();
  const [contextOpened, setContextOpened] = useState(false);

  const clickTimeout = useRef<null | NodeJS.Timeout>(null);
  const lastClickTime = useRef(0);

  const { viewWidth } = useAdaptivityConditionalRender();

  const toggleContext = () => {
    setContextOpened((previous) => !previous);
  };

  const onClickTab = (tab: THomeTab) => {
    toggleContext();
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

  // todo добавить кнопку обновить сейчас ибо мышкой неудобно
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
            Пасхальная лента
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
        after={
          <PanelHeaderButton>
            <Icon28AddOutline />
          </PanelHeaderButton>
        }
      >
        <PanelHeaderContent
          aside={
            <Icon16Dropdown
              style={{
                transform: `rotate(${contextOpened ? '180deg' : '0'})`,
              }}
            />
          }
          onClick={toggleContext}
        >
          {getName(activeTab)}
        </PanelHeaderContent>
      </PanelHeader>
      <PanelHeaderContext opened={contextOpened} onClose={toggleContext}>
        <TabsTypeWallComponent
          onClick={onClickTab}
          select={activeTab}
          mode="cell"
          tabs={allTabs}
        />
      </PanelHeaderContext>

      {children}
    </>
  );
  // return (
  //   <>
  //     <PanelHeader
  //       separator={false}
  //       before={
  //         <Fragment>
  //           <PanelHeaderButton aria-label="Открыть окно создание записи">
  //             <Icon24Add
  //               onClick={() =>
  //                 pushParameter('modal', ModalsElement.POST_CREATE)
  //               }
  //             />
  //           </PanelHeaderButton>
  //         </Fragment>
  //       }
  //     >
  //       <div onClick={() => onClickTab(activeTab)}>Пасхальная лента </div>
  //     </PanelHeader>
  //     {/*// todo нужно зафиксировать элемент в верхней части экрана*/}
  //     <TabsTypeWallComponent onClick={onClickTab} select={activeTab} />
  //     {children}
  //   </>
  // );
};
