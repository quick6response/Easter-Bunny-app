import { useDeletePost } from '@api/posts/hooks/useDeletePost';
import { useGetPostInfo } from '@api/posts/hooks/useGetPostInfo';
import { useSendRepost } from '@api/report/hooks/useSendRepost';
import { ReportSendInterface } from '@api/report/types/report.send.interface';
import { ErrorSnackbar, SuccessSnackbar } from '@components/UI/Snackbar';
import { linkConfig } from '@config/link.config';
import { useAppSelector } from '@hooks/useAppSelector';
import { useRouterPanel } from '@hooks/useRouterPanel';
import { useSnackbar } from '@hooks/useSnackbar';
import { useActionRef, useMeta } from '@itznevikat/router';
import { PopoutInterface } from '@routes/interface/popout.interface';
import { PanelTypes } from '@routes/structure.navigate';
import { errorTransformService } from '@services/error/errorTransform.service';
import { urlService } from '@services/link/url.service';
import { tapticSendSignal } from '@services/taptic-mobile/taptic.service';
import {
  Icon24Attachments,
  Icon24BookSpreadOutline,
  Icon24ClockOutline,
  Icon24PinOutline,
  Icon24TrashSmileOutline,
  Icon28SmartphoneOutline,
} from '@vkontakte/icons';
import { ActionSheet, ActionSheetItem, Link, Spinner } from '@vkontakte/vkui';
import { FC, useState } from 'react';

type TActionPost = {
  hash: string;
};

export const ActionsPost: FC<PopoutInterface> = ({ onClose }) => {
  const { setSnackbar } = useSnackbar();
  const { actionRef } = useActionRef();
  const { toPanel } = useRouterPanel();
  const userId = useAppSelector((state) => state.userVk.id);

  const { hash } = useMeta<TActionPost>();
  const [isReport, setIsRepost] = useState(false);

  const { isLoading, isError, data } = useGetPostInfo(hash);
  const { mutateAsync } = useDeletePost();
  const { mutateAsync: mutateReportAsync } = useSendRepost();

  if (isLoading) return <Spinner />;
  if (isError) return <Spinner />;
  if (!actionRef) return null;

  const onClickReport = () => {
    tapticSendSignal('success');
    setIsRepost((previousState) => !previousState);
  };

  const onClickSendReport = async (type: ReportSendInterface['type']) => {
    try {
      const send = await mutateReportAsync({
        type,
        id: type === 'walls' ? data.hash : data.photo.id,
      });
      setSnackbar(
        <SuccessSnackbar>
          Жалоба №{send.id} на {type === 'walls' ? 'запись' : 'фотографию'}{' '}
          успешно отправлена. Спасибо!
        </SuccessSnackbar>,
      );
    } catch (error) {
      setSnackbar(
        <ErrorSnackbar>
          Жалоба на {type === 'walls' ? 'запись' : 'фотографию'} не была
          отправлена. Произошла ошибка.{' '}
          {errorTransformService.getMessageError(error)}
        </ErrorSnackbar>,
      );
    }
  };

  const onClickDeletePost = async () => {
    setSnackbar(
      <SuccessSnackbar
        action="Подтвердить"
        onActionClick={async () => mutateAsync(hash)}
        before={<Icon28SmartphoneOutline />}
      >
        Подтвердите удаление записи
      </SuccessSnackbar>,
    );
  };

  const onClickPinPost = () => {
    toPanel(PanelTypes.POST_PIN, { hash });
  };

  return (
    <ActionSheet
      onClose={onClose}
      header={
        isReport ? (
          <>
            Что в записи нарушает{' '}
            <Link onClick={() => urlService.openTab(linkConfig.rulesPost)}>
              правила
            </Link>
          </>
        ) : (
          data?.pin && (
            <>
              Запись закреплена{' '}
              {data.pin.forever ? 'навсегда' : `до ${data.pin.end}`}
            </>
          )
        )
      }
      iosCloseItem={
        <ActionSheetItem autoClose mode="cancel">
          Отменить
        </ActionSheetItem>
      }
      toggleRef={actionRef}
    >
      {data?.vk_id === userId ? (
        <>
          {!data?.pin && (
            <ActionSheetItem
              mode="default"
              before={<Icon24PinOutline />}
              onClick={onClickPinPost}
              // autoClose
            >
              Закрепить запись
            </ActionSheetItem>
          )}
          {!data?.pin?.forever && (
            <ActionSheetItem
              mode="default"
              before={<Icon24ClockOutline fill={'#ffd700'} />}
              onClick={onClickPinPost}
            >
              Продлить закрепление записи
            </ActionSheetItem>
          )}
          <ActionSheetItem
            mode="destructive"
            autoClose
            onClick={onClickDeletePost}
            before={<Icon24TrashSmileOutline />}
          >
            Удалить запись
          </ActionSheetItem>
        </>
      ) : (
        <>
          {isReport && (
            <>
              <ActionSheetItem
                mode="default"
                autoClose
                before={<Icon24Attachments />}
                onClick={() => onClickSendReport('photos')}
              >
                Фотография
              </ActionSheetItem>

              {data.text && (
                <ActionSheetItem
                  mode="default"
                  autoClose
                  before={<Icon24BookSpreadOutline />}
                  onClick={() => onClickSendReport('walls')}
                >
                  Содержимое записи
                </ActionSheetItem>
              )}
            </>
          )}
          <ActionSheetItem
            mode={!isReport ? 'destructive' : 'default'}
            onClick={onClickReport}
          >
            {!isReport ? 'Пожаловаться' : 'Свернуть'}
          </ActionSheetItem>
        </>
      )}
    </ActionSheet>
  );
};
