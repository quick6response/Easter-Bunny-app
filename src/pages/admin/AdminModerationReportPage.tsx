import { ReportSendInterface } from '@api/report/types/report.send.interface';
import { AdminModerationReportComponent } from '@components/screens/AdminModerationReport/AdminModerationReportComponent';
import { PanelHeaderToBack } from '@components/UI/PanelHeader';
import { useParams } from '@itznevikat/router';
import { PanelInterface } from '@routes/interface/panel.interface';
import { Panel } from '@vkontakte/vkui';
import { FC } from 'react';

const AdminModerationReportPage: FC<PanelInterface> = ({ nav }) => {
  const { tab = 'walls' } = useParams<{ tab: ReportSendInterface['type'] }>();

  return (
    <Panel nav={nav}>
      <PanelHeaderToBack name={nav} />
      <AdminModerationReportComponent tab={tab} />
    </Panel>
  );
};

export default AdminModerationReportPage;
