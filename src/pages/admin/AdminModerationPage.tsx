import { AdminModerationWallComponent } from '@components/screens/AdminModerationWall/AdminModerationWallComponent';
import { PanelHeaderToBack } from '@components/UI/PanelHeader';
import { PanelInterface } from '@routes/interface/panel.interface';
import { Panel } from '@vkontakte/vkui';
import { FC } from 'react';

const AdminModerationPage: FC<PanelInterface> = ({ nav }) => {
  return (
    <Panel nav={nav}>
      <PanelHeaderToBack name="Модерация записей" />
      <AdminModerationWallComponent />
    </Panel>
  );
};

export default AdminModerationPage;
