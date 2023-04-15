import { useRouterPanel } from '@hooks/useRouterPanel';
import { useRouterPopout } from '@hooks/useRouterPopout';
import { ModalsElement } from '@routes/structure.modal';
import { Icon24Add, Icon24Share } from '@vkontakte/icons';
import { PanelHeader, PanelHeaderButton } from '@vkontakte/vkui';
import { FC, Fragment, useState } from 'react';

export const PanelHeaderMyProfile: FC<{ name: string }> = ({ name }) => {
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
