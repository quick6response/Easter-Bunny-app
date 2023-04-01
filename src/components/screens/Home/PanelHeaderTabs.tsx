import { useRouterPopout } from '@hooks/useRouterPopout';
import { ModalTypes } from '@routes/structure.modal';
import { Icon24Add } from '@vkontakte/icons';
import {
  HorizontalScroll,
  PanelHeader,
  PanelHeaderButton,
  Tabs,
  TabsItem,
} from '@vkontakte/vkui';
import { FC, PropsWithChildren } from 'react';

export const PanelHeaderTabs: FC<PropsWithChildren> = ({ children }) => {
  const { pushParameter } = useRouterPopout();
  return (
    <>
      <PanelHeader
        before={
          <PanelHeaderButton>
            <Icon24Add
              onClick={() => pushParameter('modal', ModalTypes.POST_CREATE)}
            />
          </PanelHeaderButton>
        }
      >
        <Tabs mode="secondary">
          <HorizontalScroll arrowSize="m">
            <TabsItem selected>Все</TabsItem>
            <TabsItem>Закрепленные</TabsItem>
            <TabsItem>Популярные</TabsItem>
          </HorizontalScroll>
        </Tabs>
      </PanelHeader>
      {children}
    </>
  );
};
