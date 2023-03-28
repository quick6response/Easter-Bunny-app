import { useRouterPanel } from '@hooks/useRouterPanel';
import { useRouterPopout } from '@hooks/useRouterPopout';
import { PanelHeader, PanelHeaderBack } from '@vkontakte/vkui';
import { FC, useState } from 'react';

export const PanelHeaderToBack: FC<{ name: string }> = ({ name }) => {
  const [widthDevice, setWidthDevice] = useState<number>(window.innerWidth);
  const { toBackActiveView } = useRouterPanel();
  const { pushParameter } = useRouterPopout();

  return (
    <PanelHeader
      before={<PanelHeaderBack onClick={() => toBackActiveView()} />}
    >
      {widthDevice > 375 ? <h3>{name}</h3> : name}
    </PanelHeader>
  );
};
