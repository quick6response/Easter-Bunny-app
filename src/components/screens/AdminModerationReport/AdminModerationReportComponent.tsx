import { useReplyAdminReport } from '@api/admin/report/hooks/useReplyAdminReport';
import { ReportSendInterface } from '@api/report/types/report.send.interface';
import { ModerationCommentsComponent } from '@components/screens/AdminModerationReport/Comment/ModerationCommentsComponent';
import { ModerationPhotosComponent } from '@components/screens/AdminModerationReport/Photo/ModerationPhotosComponent';
import { ModerationPostsComponent } from '@components/screens/AdminModerationReport/Post/ModerationPostsComponent';
import { TabsModeration } from '@components/screens/AdminModerationReport/TabsModeration';
import { ModerationReportType } from '@components/screens/AdminModerationReport/types/moderation.report.type';
import { ErrorSnackbar } from '@components/UI/Snackbar';
import { useRouterPanel } from '@hooks/useRouterPanel';
import { useSnackbar } from '@hooks/useSnackbar';
import { errorTransformService } from '@services/error/errorTransform.service';
import { Group } from '@vkontakte/vkui';
import { FC, useState } from 'react';

export const AdminModerationReportComponent: FC<{
  tab: ReportSendInterface['type'];
}> = ({ tab }) => {
  const { setSnackbar } = useSnackbar();
  const { pushParameterForPanel } = useRouterPanel();
  const [activeTab, setActiveTab] = useState(tab || 'walls');
  const replyRetort = useReplyAdminReport(activeTab);
  const onClickSetActiveTab = (type: ReportSendInterface['type']) => {
    pushParameterForPanel({ tab: type });
    setActiveTab(type);
  };

  const onClickButtonVote = async (dto: ModerationReportType) => {
    try {
      const vote = await replyRetort.mutateAsync(dto);
      return false;
    } catch (error) {
      setSnackbar(
        <ErrorSnackbar>
          {errorTransformService.getMessageError(error)}
        </ErrorSnackbar>,
      );
      return false;
    }
  };

  return (
    <>
      <Group>
        <TabsModeration onClick={onClickSetActiveTab} activeTab={activeTab} />
      </Group>
      {activeTab === 'walls' && (
        <ModerationPostsComponent
          type={tab}
          onClickButton={onClickButtonVote}
        />
      )}
      {activeTab === 'photos' && (
        <ModerationPhotosComponent
          type={tab}
          onClickButton={onClickButtonVote}
        />
      )}
      {activeTab === 'comments' && (
        <ModerationCommentsComponent
          type={tab}
          onClickButton={onClickButtonVote}
        />
      )}
    </>
  );
};
