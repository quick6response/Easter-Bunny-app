import { useDeletePost } from '@api/posts/hooks/useDeletePost';
import { useGetPostInfo } from '@api/posts/hooks/useGetPostInfo';
import { useRouterPanel } from '@hooks/useRouterPanel';
import { useSnackbar } from '@hooks/useSnackbar';
import { go, useMeta } from '@itznevikat/router';
import { PopoutInterface } from '@routes/interface/popout.interface';
import { errorTransformService } from '@services/error/errorTransform.service';
import { Alert, ScreenSpinner } from '@vkontakte/vkui';
import { FC } from 'react';

export const ConfirmDeletePostAlert: FC<PopoutInterface> = ({ onClose }) => {
  const { hash } = useMeta<{ hash: string }>();
  const { setSnackbar } = useSnackbar();
  const { view, panel } = useRouterPanel();
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
    return go(-4);
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
      text="Подствердите удаление записи"
    />
  );
};
