import { useDeleteComment } from '@api/comment/hooks/useDeleteComment';
import { useSnackbar } from '@hooks/useSnackbar';
import { useMeta, useParams } from '@itznevikat/router';
import { PopoutInterface } from '@routes/interface/popout.interface';
import { errorTransformService } from '@services/error/errorTransform.service';
import { Alert } from '@vkontakte/vkui';
import { FC } from 'react';

export const AlertConfirmDeleteComment: FC<PopoutInterface> = ({
  onClose,
  nav,
}) => {
  const { setSnackbar } = useSnackbar();
  const { hash } = useParams<{ hash: string; commentId: string }>();
  const { commentId } = useMeta<{ commentId: string }>();
  const deleteComment = useDeleteComment();

  const onClickDeleteComment = async () => {
    try {
      const deleteCom = await deleteComment.mutateAsync({
        hash,
        id: Number(commentId),
      });
      return onClose();
    } catch {
      console.log('ошибка удаления');
    }
  };

  if (deleteComment.isError)
    return (
      <Alert
        actions={[
          {
            title: 'Назад',
            autoClose: true,
            mode: 'cancel',
          },
        ]}
        actionsLayout="horizontal"
        onClose={() => onClose()}
        header="Ошибка"
        text={errorTransformService.getMessageError(deleteComment.error)}
      />
    );

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
          action: () => {
            onClickDeleteComment();
          },
        },
      ]}
      actionsLayout="horizontal"
      onClose={() => onClose()}
      header="Вы собираетесь удалить свой комментарий"
      text="Подтвердите удаление комментария"
    />
  );
};
