import { PanelHeaderToBack } from '@components/UI/PanelHeader';
import { PanelInterface } from '@routes/interface/panel.interface';
import { Group, Panel, Placeholder } from '@vkontakte/vkui';
import { FC } from 'react';

const AdminModerationReportPage: FC<PanelInterface> = ({ nav }) => {
  return (
    <Panel nav={nav}>
      <PanelHeaderToBack name={nav} />
      <Group>
        <Placeholder>Скоро тут будет модерация жалоб</Placeholder>
      </Group>
    </Panel>
  );
};

export default AdminModerationReportPage;
