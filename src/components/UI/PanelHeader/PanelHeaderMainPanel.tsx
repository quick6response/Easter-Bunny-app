import {useRouterPopout} from '@hooks/useRouterPopout';
import {ModalsElement} from '@routes/structure.modal';
import {Icon24Add} from '@vkontakte/icons';
import {PanelHeader} from '@vkontakte/vkui';
import {FC, useState} from 'react';

export const PanelHeaderMainPanel: FC<{ name: string }> = ({ name }) => {
  const [widthDevice, setWidthDevice] = useState<number>(window.innerWidth);
  const { pushParameter } = useRouterPopout();

  return (
    <PanelHeader
      before={
        <Icon24Add
          onClick={() => pushParameter('modal', ModalsElement.POST_CREATE)}
        />
      }
    >
      {widthDevice > 375 ? <h3>{name}</h3> : <h4>{name}</h4>}
    </PanelHeader>
  );
};
