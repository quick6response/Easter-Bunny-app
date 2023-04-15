import { useGetAdminReportsComments } from '@api/admin/report/hooks/useGetAdminReportsComments';
import { ReportCommentComponent } from '@components/screens/AdminModerationReport/Comment/ReportCommentComponent';
import { ModerationReportComponentType } from '@components/screens/AdminModerationReport/types/moderation.report.component.type';
import { FooterVersionApp } from '@components/UI/Footer/FooterVersionApp';
import { ErrorSnackbar } from '@components/UI/Snackbar';
import { useRouterPanel } from '@hooks/useRouterPanel';
import { useSnackbar } from '@hooks/useSnackbar';
import { PanelTypes, ViewTypes } from '@routes/structure.navigate';
import { errorTransformService } from '@services/error/errorTransform.service';
import {
  Group,
  List,
  Placeholder,
  PullToRefresh,
  Spinner,
} from '@vkontakte/vkui';
import { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import { useInView } from 'react-intersection-observer';

export const ModerationCommentsComponent: FC<ModerationReportComponentType> = ({
  type,
  onClickButton,
}) => {
  const { toPanel, toPanelAndView } = useRouterPanel();

  const getComments = useGetAdminReportsComments(type);
  const { setSnackbar } = useSnackbar();
  const isRefrech = useRef(false);
  const { ref, inView } = useInView({
    threshold: 0.7,
  });

  useEffect(() => {
    if (inView && getComments.hasNextPage) {
      getComments.fetchNextPage();
      // console.log('запрашиваю еще записи');
    }
  }, [inView]);

  const allPhotos = useMemo(() => {
    // console.log(`Изменился состав записей ${type}`);
    if (getComments?.data?.pages?.length)
      return getComments.data?.pages?.map((page) => page?.items).flat();
  }, [getComments?.data, getComments?.dataUpdatedAt]);

  const onRefrech = useCallback(async () => {
    if (isRefrech.current) return;
    isRefrech.current = true;

    return getComments
      .refetch()
      .then()
      .catch((error_) =>
        setSnackbar(
          <ErrorSnackbar>
            {errorTransformService.getMessageError(error_)}
          </ErrorSnackbar>,
        ),
      )
      .finally(() => (isRefrech.current = false));
  }, []);

  const onClickAvatarUser = (id_vk: number) => {
    toPanelAndView(ViewTypes.PROFILE, PanelTypes.PROFILE_USER, {
      userId: id_vk,
    });
  };

  // if (type !== 'comments') return <ScreenSpinner />;
  if (getComments.isError)
    return (
      <Group>
        <Placeholder>
          {errorTransformService.getMessageError(getComments.error)}
        </Placeholder>
      </Group>
    );

  if (getComments.isLoading)
    return (
      <Group>
        <Placeholder icon={<Spinner />}>Загрузка...</Placeholder>
      </Group>
    );

  return (
    <PullToRefresh onRefresh={onRefrech} isFetching={isRefrech.current}>
      <List>
        {allPhotos?.length ? (
          <>
            {allPhotos?.map((report) => (
              <ReportCommentComponent
                key={report.id}
                report={report}
                onClickButton={onClickButton}
                onClickAvatarUser={onClickAvatarUser}
              />
            ))}

            {getComments.isFetchingNextPage && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  flexDirection: 'column',
                }}
              >
                <Spinner size="regular" style={{ margin: '20px 0' }} />
              </div>
            )}
          </>
        ) : (
          <Group>
            <Placeholder>Жалоб на комментарии больше нет!</Placeholder>
          </Group>
        )}
      </List>
      <div ref={ref} />
      <FooterVersionApp />
    </PullToRefresh>
  );
};
