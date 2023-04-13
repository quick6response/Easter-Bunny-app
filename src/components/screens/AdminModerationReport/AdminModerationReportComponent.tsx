import { useReplyAdminReport } from '@api/admin/report/hooks/useReplyAdminReport';
import { ReportSendInterface } from '@api/report/types/report.send.interface';
import { TabsModeration } from '@components/screens/AdminModerationReport/TabsModeration';
import { ModerationReportComponentType } from '@components/screens/AdminModerationReport/types/moderation.report.component.type';
import { ModerationReportType } from '@components/screens/AdminModerationReport/types/moderation.report.type';
import { ErrorSnackbar, SuccessSnackbar } from '@components/UI/Snackbar';
import { useAction } from '@hooks/useActions';
import { useAppSelector } from '@hooks/useAppSelector';
import { useRouterPanel } from '@hooks/useRouterPanel';
import { useSnackbar } from '@hooks/useSnackbar';
import { errorTransformService } from '@services/error/errorTransform.service';
import { adminModerationSliceActions } from '@store/moderation/admin.moderation.slice';
import { Icon28SmartphoneOutline } from '@vkontakte/icons';
import { Group, Placeholder } from '@vkontakte/vkui';
import { FC, lazy, LazyExoticComponent, useEffect, useState } from 'react';

const componentMap: Record<
  ReportSendInterface['type'],
  LazyExoticComponent<FC<ModerationReportComponentType>>
> = {
  walls: lazy(() =>
    import('./Post/ModerationPostsComponent').then(
      ({ ModerationPostsComponent }) => ({ default: ModerationPostsComponent }),
    ),
  ),
  photos: lazy(() =>
    import('./Photo/ModerationPhotosComponent').then(
      ({ ModerationPhotosComponent }) => ({
        default: ModerationPhotosComponent,
      }),
    ),
  ),
  comments: lazy(() =>
    import('./Comment/ModerationCommentsComponent').then(
      ({ ModerationCommentsComponent }) => ({
        default: ModerationCommentsComponent,
      }),
    ),
  ),
};

export const AdminModerationReportComponent: FC<{
  tab: ReportSendInterface['type'];
}> = ({ tab }) => {
  const { setSnackbar } = useSnackbar();

  const confirmDate = useAppSelector(
    (state) => state.adminModeration.dateConfirm,
  );
  const isConfirm = useAppSelector((state) => state.adminModeration.isConfirm);
  const adminModerAction = useAction(adminModerationSliceActions);

  const { pushParameterForPanel } = useRouterPanel();
  const [activeTab, setActiveTab] =
    useState<ReportSendInterface['type']>('walls');

  const replyRetort = useReplyAdminReport(activeTab);

  useEffect(() => {
    if (tab) setActiveTab(tab);
  }, [tab]);

  const onClickSetActiveTab = (type: ReportSendInterface['type']) => {
    pushParameterForPanel({ tab: type });
    setActiveTab(type);
  };

  const onClickButtonVote = async (dto: ModerationReportType) => {
    const text = `Подтвердите действие с объектом (id${dto.id} status: ${
      dto.status ? 'Принять' : 'Отклонить'
    })`;
    try {
      if (isConfirm) {
        setSnackbar(
          <SuccessSnackbar
            action="Подтвердить"
            onActionClick={async () => replyRetort.mutateAsync(dto)}
            before={<Icon28SmartphoneOutline />}
          >
            {text}
          </SuccessSnackbar>,
        );
        return false;
      }
      // пора обновить подтверждение
      if (confirmDate && Date.now() > confirmDate) {
        setSnackbar(
          <SuccessSnackbar
            action="Подтвердить"
            onActionClick={async () => {
              const newTime = new Date();
              adminModerAction.setDate(
                new Date(
                  newTime.setMinutes(newTime.getMinutes() + 1),
                ).getTime(),
              );
              return replyRetort.mutateAsync(dto);
            }}
            before={<Icon28SmartphoneOutline />}
          >
            {text}
            Через минуту вновь спрошу :)
          </SuccessSnackbar>,
        );
        return false;
      }
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

  const Component = componentMap[tab];

  return (
    <>
      <Group>
        <TabsModeration onClick={onClickSetActiveTab} activeTab={activeTab} />
      </Group>
      {Component ? (
        <Component type={tab} onClickButton={onClickButtonVote} />
      ) : (
        <Placeholder>Такого таба нет!</Placeholder>
      )}
    </>
  );
};
