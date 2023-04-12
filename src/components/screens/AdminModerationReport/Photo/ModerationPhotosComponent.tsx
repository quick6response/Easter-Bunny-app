import { useGetAdminReportsPhotos } from '@api/admin/report/hooks/useGetAdminReportsPhotos';
import { ReportPhotoComponent } from '@components/screens/AdminModerationReport/Photo/ReportPhotoComponent';
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

export const ModerationPhotosComponent: FC<ModerationReportComponentType> = ({
  type,
  onClickButton,
}) => {
  const getPhotos = useGetAdminReportsPhotos(type);
  const { setSnackbar } = useSnackbar();
  const isRefrech = useRef(false);
  const { ref, inView } = useInView({
    threshold: 0.7,
  });

  useEffect(() => {
    if (inView && getPhotos.hasNextPage) {
      getPhotos.fetchNextPage();
      console.log('запрашиваю еще записи');
    }
  }, [inView]);

  const allPhotos = useMemo(() => {
    console.log(`Изменился состав записей ${type}`);
    if (getPhotos?.data?.pages?.length)
      return getPhotos.data?.pages?.map((page) => page?.items).flat();
  }, [getPhotos?.data, getPhotos?.dataUpdatedAt]);

  const onRefrech = useCallback(async () => {
    if (isRefrech.current) return;
    isRefrech.current = true;

    return getPhotos
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

  if (getPhotos.isError)
    return (
      <Group>
        <Placeholder>
          {errorTransformService.getMessageError(getPhotos.error)}
        </Placeholder>
      </Group>
    );

  if (getPhotos.isLoading)
    return (
      <Group>
        <Placeholder icon={<Spinner />}>Загрузка...</Placeholder>
      </Group>
    );

  return (
    <PullToRefresh onRefresh={onRefrech} isFetching={isRefrech.current}>
      {allPhotos?.length ? (
        <List>
          {allPhotos?.map((report) => (
            <ReportPhotoComponent
              key={report.id}
              report={report}
              onClickButton={onClickButton}
            />
          ))}

          {getPhotos.isFetchingNextPage && (
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
