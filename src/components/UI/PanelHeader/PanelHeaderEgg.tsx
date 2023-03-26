import { useRouterPopout } from '@hooks/useRouterPopout';
import { ModalTypes } from '@routes/structure.modal';
import { utilsService } from '@services/utils/utils.service';
import { Icon24Add } from '@vkontakte/icons';
import { PanelHeader, PanelHeaderContent } from '@vkontakte/vkui';
import { FC, useEffect, useState } from 'react';

export const PanelHeaderEgg: FC<{ name: string }> = ({ name }) => {
  const [widthDevice, setWidthDevice] = useState<number>(window.innerWidth);
  const [indexImg, setIndexImg] = useState(1);
  const { pushParameter } = useRouterPopout();

  useEffect(() => {
    const interval = setInterval(() => {
      const randomNumber = utilsService.random(1, 2);
      setIndexImg(randomNumber);
    }, 5000);

    return () => clearInterval(interval);
  }, [name]);

  return (
    <PanelHeader
      before={
        <Icon24Add
          onClick={() => pushParameter('modal', ModalTypes.POST_CREATE)}
        />
      }
    >
      <PanelHeaderContent>
        {widthDevice > 375 ? <h2>{name}</h2> : name}
      </PanelHeaderContent>
    </PanelHeader>
  );
};
