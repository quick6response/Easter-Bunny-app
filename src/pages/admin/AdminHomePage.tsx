import { useRouterPanel } from '@hooks/useRouterPanel';
import { PanelInterface } from '@routes/interface/panel.interface';
import { PanelTypes } from '@routes/structure.navigate';
import { CellButton, Group, Panel, PanelHeader } from '@vkontakte/vkui';
import { FC } from 'react';

const AdminHomePage: FC<PanelInterface> = ({ nav }) => {
  const { toPanel } = useRouterPanel();
  return (
    <Panel nav={nav}>
      <PanelHeader>Меню</PanelHeader>
      <Group>
        <CellButton onClick={() => toPanel(PanelTypes.ADMIN_MODERATION)}>
          Модерация
        </CellButton>
        <CellButton onClick={() => toPanel(PanelTypes.ADMIN_MODER_REPORTS)}>
          Жалобы
        </CellButton>
      </Group>
    </Panel>
  );
};

export default AdminHomePage;
