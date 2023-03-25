import { PanelHeaderEgg } from '@components/UI/PanelHeader/PanelHeaderEgg';
import { PanelInterface } from '@routes/interface/panel.interface';
import { CellButton, Group, Panel } from '@vkontakte/vkui';
import { FC } from 'react';

const ProfilePage: FC<PanelInterface> = () => {
  return (
    <Panel>
      <PanelHeaderEgg name={'Профиль'} />
      <Group>
        <CellButton>Все окей, скоро будет тут содер</CellButton>
      </Group>
    </Panel>
  );
};

export default ProfilePage;
