import { useGetAdminReportsWalls } from '@api/admin/report/hooks/useGetAdminReportsWalls';
import { ReportPostComponent } from '@components/screens/AdminModerationReport/Post/ReportPostComponent';
import { ModerationReportComponentType } from '@components/screens/AdminModerationReport/types/moderation.report.component.type';
import { FooterVersionApp } from '@components/UI/Footer/FooterVersionApp';
import { ErrorSnackbar } from '@components/UI/Snackbar';
import { useSnackbar } from '@hooks/useSnackbar';
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

export const ModerationPostsComponent: FC<ModerationReportComponentType> = ({
  type,
  onClickButton,
}) => {
  const getPosts = useGetAdminReportsWalls(type);
  const { setSnackbar } = useSnackbar();
  const isRefrech = useRef(false);

  const { ref, inView } = useInView({
    threshold: 0.7,
  });

  useEffect(() => {
    if (inView && getPosts.hasNextPage) {
      getPosts.fetchNextPage();
      console.log('запрашиваю еще записи');
    }
  }, [inView]);

  const allReports = useMemo(() => {
    console.log(`Изменился состав репортов ${type}`);
    if (getPosts?.data?.pages?.length)
      return getPosts.data?.pages?.map((page) => page?.items).flat();
  }, [getPosts?.data, getPosts?.dataUpdatedAt]);

  const onRefrech = useCallback(async () => {
    if (isRefrech.current) return;
    isRefrech.current = true;

    return getPosts
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

  if (getPosts.isError)
    return (
      <Group>
        <Placeholder>
          {errorTransformService.getMessageError(getPosts.error)}
        </Placeholder>
      </Group>
    );

  if (getPosts.isLoading)
    return (
      <Group>
        <Placeholder icon={<Spinner />}>Загрузка...</Placeholder>
      </Group>
    );

  return (
    <PullToRefresh onRefresh={onRefrech} isFetching={isRefrech.current}>
      {allReports?.length ? (
        <List>
          {allReports?.map((report) => (
            <ReportPostComponent
              key={report.id}
              report={report}
              onClickVoteButton={onClickButton}
            />
          ))}
          {getPosts.isFetchingNextPage && (
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
        </List>
      ) : (
        <Group>
          <Placeholder>Записей больше нет!</Placeholder>
        </Group>
      )}

      <div ref={ref} />
      <FooterVersionApp />
    </PullToRefresh>
  );
};
