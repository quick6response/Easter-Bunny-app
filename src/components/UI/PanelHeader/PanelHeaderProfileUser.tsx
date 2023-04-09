import { useRouterPanel } from '@hooks/useRouterPanel';
import { useRouterPopout } from '@hooks/useRouterPopout';
import { ModalsElement } from '@routes/structure.modal';
import { PanelTypes } from '@routes/structure.navigate';
import { Icon24Add, Icon24Settings } from '@vkontakte/icons';
import { PanelHeader, PanelHeaderButton } from '@vkontakte/vkui';
import { FC, Fragment, useState } from 'react';

export const PanelHeaderProfileUser: FC<{ name: string }> = ({ name }) => {
  const [widthDevice, setWidthDevice] = useState<number>(window.innerWidth);
  const { pushParameter } = useRouterPopout();
  const { toPanel } = useRouterPanel();

  return (
    <PanelHeader
      before={
        <Fragment>
          <PanelHeaderButton aria-label="Открыть окно создание записи">
            <Icon24Add
              onClick={() => pushParameter('modal', ModalsElement.POST_CREATE)}
            />
          </PanelHeaderButton>
          <PanelHeaderButton aria-label="Настройки профиля">
            <Icon24Settings
              onClick={() => toPanel(PanelTypes.PROFILE_SETTING)}
            />
          </PanelHeaderButton>
        </Fragment>
      }
    >
      {widthDevice > 375 ? <h3>{name}</h3> : <h4>{name}</h4>}
    </PanelHeader>
  );
};
