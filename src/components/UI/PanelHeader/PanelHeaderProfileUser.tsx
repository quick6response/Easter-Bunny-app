import { useRouterPanel } from '@hooks/useRouterPanel';
import { useRouterPopout } from '@hooks/useRouterPopout';
import { ModalsElement } from '@routes/structure.modal';
import { Icon24Share } from '@vkontakte/icons';
import {
  PanelHeader,
  PanelHeaderBack,
  PanelHeaderButton,
} from '@vkontakte/vkui';
import { FC, Fragment, useState } from 'react';

export const PanelHeaderProfileUser: FC<{ name: string }> = ({ name }) => {
  const [widthDevice, setWidthDevice] = useState<number>(window.innerWidth);
  const { pushParameter } = useRouterPopout();
  const { toPanel, toBackActiveView } = useRouterPanel();

  return (
    <PanelHeader
      before={
        <Fragment>
          <PanelHeaderBack onClick={() => toBackActiveView()} />
          <PanelHeaderButton aria-label="Поделиться профилем">
            <Icon24Share
              onClick={() =>
                pushParameter('modal', ModalsElement.PROFILE_SHARE)
              }
            />
          </PanelHeaderButton>
        </Fragment>
      }
    >
      {widthDevice > 375 ? <h3>{name}</h3> : <h4>{name}</h4>}
    </PanelHeader>
  );
};
