import {
  TabsTypeWallComponent,
  WallTypeElementInterface,
} from '@components/UI/Tabs/TabsTypeWallComponent';
import { useAppSelector } from '@hooks/useAppSelector';
import { useRouterPopout } from '@hooks/useRouterPopout';
import { ModalsElement } from '@routes/structure.modal';
import { THomeTab } from '@store/wall/wall.panel.slice';
import {
  Icon16Camera,
  Icon16Crown,
  Icon16HistoryBackwardOutline,
  Icon16ThumbsUpOutline,
  Icon24Add,
  Icon24Refresh,
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
import { FC, Fragment, PropsWithChildren } from 'react';

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
  onClickTab: (tab: THomeTab) => void;
  // показывает, что идет обновление ленты и кнопку нужно блокировать
  isRefreshing?: boolean;
}

export const PanelHeaderTabs: FC<
  PropsWithChildren<PanelHeaderTabsPropertiesInterface>
> = ({ children, onClickTab, onRefresh, isRefreshing }) => {
  const platform = usePlatform();
  const activeTab = useAppSelector((state) => state.wallPanel.tab);
  const { pushParameter } = useRouterPopout();

  const { viewWidth } = useAdaptivityConditionalRender();

  // todo добавить кнопку обновить сейчас ибо мышкой неудобно
  if (platform === Platform.VKCOM)
    return (
      <>
        <FixedLayout vertical="top">
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
                <PanelHeaderButton
                  aria-label="Обновить список записей выбранной категории"
                  disabled={true}
                >
                  <Icon24Add onClick={() => onRefresh()} />
                </PanelHeaderButton>
              </Fragment>
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

  // todo добавить кнопку обновить сейчас ибо мышкой неудобно
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
            <PanelHeaderButton
              aria-label="Обновить список записей выбранной категории"
              disabled={isRefreshing}
            >
              <Icon24Refresh onClick={() => onRefresh()} />
            </PanelHeaderButton>
          </Fragment>
        }
      >
        <div onClick={() => onClickTab(activeTab)}>Пасхальная лента </div>
      </PanelHeader>
      {/*// todo нужно зафиксировать элемент в верхней части экрана*/}
      <Group>
        <TabsTypeWallComponent
          onClick={onClickTab}
          select={activeTab}
          tabs={allTabs}
        />
      </Group>

      {children}
    </>
  );
};
