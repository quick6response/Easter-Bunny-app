import { useDeletePost } from '@api/posts/hooks/useDeletePost';
import { useGetPostInfo } from '@api/posts/hooks/useGetPostInfo';
import { useRouterPanel } from '@hooks/useRouterPanel';
import { useSnackbar } from '@hooks/useSnackbar';
import { replace, useMeta, useParams } from '@itznevikat/router';
import { PopoutInterface } from '@routes/interface/popout.interface';
import { routerService } from '@routes/router.service';
import { errorTransformService } from '@services/error/errorTransform.service';
import { Alert, ScreenSpinner } from '@vkontakte/vkui';
import { FC } from 'react';

export const ConfirmDeletePostAlert: FC<PopoutInterface> = ({ onClose }) => {
  const { hash } = useMeta<{ hash: string }>();
  const { setSnackbar } = useSnackbar();
  const { view, panel } = useRouterPanel();
  const parameterPage = useParams();
  // const { bachAndReplace } = useRouterPopout();
  const { isLoading, isError, data, error } = useGetPostInfo(hash);
  const { mutateAsync } = useDeletePost();

  if (isLoading) return <ScreenSpinner></ScreenSpinner>;
  if (isError) {
    return (
      <Alert
        actions={[
          {
            title: 'Закрыть',
            autoClose: true,
            mode: 'cancel',
          },
        ]}
        actionsLayout="horizontal"
        onClose={() => onClose()}
        header="Ошибка"
        text={errorTransformService.getMessageError(error)}
      />
    );
  }

  if (data?.pin) {
    return (
      <Alert
        actions={[
          {
            title: 'Закрыть',
            autoClose: true,
            mode: 'cancel',
          },
        ]}
        actionsLayout="horizontal"
        onClose={() => onClose()}
        header="Ошибка"
        text="Нельзя удалить закрепленную запись."
      />
    );
  }

  const onClickDeletePost = async () => {
    await mutateAsync(hash);
    return replace(
      routerService.getHashStart(new URLSearchParams(parameterPage).toString()),
    );
  };

  return (
    <Alert
      actions={[
        {
          title: 'Отмена',
          autoClose: true,
          mode: 'cancel',
        },
        {
          title: 'Удалить',
          mode: 'destructive',
          autoClose: true,
          action: () => {
            onClickDeletePost();
          },
        },
      ]}
      actionsLayout="horizontal"
      onClose={() => onClose()}
      header="Вы собираетесь удалить свою запись"
      text="Подтвердите удаление записи"
    />
  );
};
