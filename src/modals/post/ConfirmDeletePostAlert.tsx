import { useDeletePost } from '@api/posts/hooks/useDeletePost';
import { useGetPostInfo } from '@api/posts/hooks/useGetPostInfo';
import { ErrorSnackbar, SuccessSnackbar } from '@components/UI/Snackbar';
import { useRouterPanel } from '@hooks/useRouterPanel';
import { useSnackbar } from '@hooks/useSnackbar';
import { back, useMeta } from '@itznevikat/router';
import { PopoutInterface } from '@routes/interface/popout.interface';
import { Icon28SmartphoneOutline } from '@vkontakte/icons';
import { Alert, ScreenSpinner } from '@vkontakte/vkui';
import { FC } from 'react';

export const ConfirmDeletePostAlert: FC<PopoutInterface> = ({ onClose }) => {
  const { hash } = useMeta<{ hash: string }>();
  const { setSnackbar } = useSnackbar();
  const { view, panel } = useRouterPanel();
  // const { bachAndReplace } = useRouterPopout();
  const { isLoading, isError, data } = useGetPostInfo(hash);
  const { mutateAsync } = useDeletePost();

  if (isLoading) return <ScreenSpinner></ScreenSpinner>;
  if (isError) {
    // onClose();
    setSnackbar(
      <ErrorSnackbar>
        Что-то пошло не так при получение информации о посте.
      </ErrorSnackbar>,
    );
    return null;
  }

  const onClickDeletePost = async () => {
    if (data?.pin) {
      setSnackbar(
        <SuccessSnackbar
          action="Да!"
          onActionClick={async () => mutateAsync(hash)}
          before={<Icon28SmartphoneOutline />}
        >
          В последний раз спрашиваем, Вы действительно хотите удалить
          закрепленную запись?
        </SuccessSnackbar>,
      );
    } else {
      await mutateAsync(hash);
    }
    back();
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
      text="Подствердите свое дейтсвие. Если запись закреплена, возврат голосов не предусмотрен."
    />
  );
};
