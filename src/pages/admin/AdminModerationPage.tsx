import { PanelInterface } from '@routes/interface/panel.interface';
import { Panel, PanelHeader } from '@vkontakte/vkui';
import { FC } from 'react';

const AdminModerationPage: FC<PanelInterface> = ({ nav }) => {
  return (
    <Panel nav={nav}>
      <PanelHeader>Модерация записей</PanelHeader>
    </Panel>
  );
};

export default AdminModerationPage;
