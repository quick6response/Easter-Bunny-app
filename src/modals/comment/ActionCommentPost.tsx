import { useSendRepost } from '@api/report/hooks/useSendRepost';
import { ErrorSnackbar, SuccessSnackbar } from '@components/UI/Snackbar';
import { useSnackbar } from '@hooks/useSnackbar';
import { useActionRef, useMeta } from '@itznevikat/router';
import { PopoutInterface } from '@routes/interface/popout.interface';
import { errorTransformService } from '@services/error/errorTransform.service';
import { tapticSendSignal } from '@services/taptic-mobile/taptic.service';
import {
  ActionSheet,
  ActionSheetItem,
  Alert,
  Platform,
  usePlatform,
} from '@vkontakte/vkui';
import { FC, useState } from 'react';

export const ActionCommentPost: FC<PopoutInterface> = ({ nav, onClose }) => {
  const platform = usePlatform();
  const { setSnackbar } = useSnackbar();
  const { commentId } = useMeta<{ commentId: string }>();
  const { mutateAsync } = useSendRepost();
  const { actionRef } = useActionRef();
  const [selectSendReport, setSelectSendReport] = useState(false);

  const onClickSendReport = async () => {
    console.log('Отправили жалобу');
    try {
      const sendReport = await mutateAsync({ type: 'comments', id: commentId });
      if (sendReport?.new)
        setSnackbar(
          <SuccessSnackbar>
            Жалоба №{sendReport.id} успешно отправлена. Спасибо!
          </SuccessSnackbar>,
        );
      else
        setSnackbar(
          <SuccessSnackbar>
            Вы ранее отправляли жалобу на этот комментарий, не дублируйте ее.
          </SuccessSnackbar>,
        );
    } catch (error_) {
      setSnackbar(
        <ErrorSnackbar>
          {errorTransformService.getMessageError(error_)}
        </ErrorSnackbar>,
      );
    }
  };

  const onClickOpenMenuReport = () => {
    tapticSendSignal('success');
    setSelectSendReport((previousState) => !previousState);
  };

  if (platform === Platform.VKCOM)
    return (
      <Alert
        actions={[
          {
            title: 'Отмена',
            autoClose: true,
            mode: 'cancel',
          },
          {
            title: 'Подтвердить',
            mode: 'destructive',
            autoClose: true,
            action: () => {
              onClickSendReport();
            },
          },
        ]}
        actionsLayout="horizontal"
        onClose={() => onClose()}
        header="Вы собираетесь отправить жалобу на комментарий"
        text="Вы действительно хотите отправить жалобу?"
      />
    );

  return (
    <ActionSheet
      onClose={onClose}
      iosCloseItem={
        <ActionSheetItem autoClose mode="cancel">
          Отменить
        </ActionSheetItem>
      }
      header={selectSendReport && 'Подтвердите оправку жалобы на комментарий.'}
      toggleRef={actionRef}
    >
      <>
        {selectSendReport && (
          <ActionSheetItem
            autoClose
            mode={!selectSendReport ? 'destructive' : 'default'}
            onClick={onClickSendReport}
          >
            Подтвердить
          </ActionSheetItem>
        )}
        <ActionSheetItem
          mode={!selectSendReport ? 'destructive' : 'default'}
          onClick={onClickOpenMenuReport}
        >
          {!selectSendReport ? 'Пожаловаться' : 'Свернуть'}
        </ActionSheetItem>
      </>
    </ActionSheet>
  );
};
