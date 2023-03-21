import { utilsService } from '@services/utils/utils.service';
import { PanelHeader, PanelHeaderContent } from '@vkontakte/vkui';
import { FC, useEffect, useState } from 'react';

export const PanelHeaderEgg: FC<{ name: string }> = ({ name }) => {
  const [widthDevice, setWidthDevice] = useState<number>(window.innerWidth);
  const [indexImg, setIndexImg] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomNumber = utilsService.random(1, 2);
      setIndexImg(randomNumber);
    }, 5000);

    return () => clearInterval(interval);
  }, [name]);

  return (
    <PanelHeader>
      <PanelHeaderContent
        before={
          <div
            style={{
              padding: '5px',
              position: 'relative',
              right: '-5px',
              justifyContent: 'center',
            }}
          >
            <img
              width={28}
              height={28}
              src={`./media/icon-easter-egg-${indexImg}.png`}
              alt={'https://www.flaticon.com/ru/free-icon/easter-egg_7255997'}
            />
          </div>
        }
      >
        {widthDevice > 375 ? <h2>{name}</h2> : name}
      </PanelHeaderContent>
    </PanelHeader>
  );
};
