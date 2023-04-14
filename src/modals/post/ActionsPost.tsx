import { useGetPostInfo } from '@api/posts/hooks/useGetPostInfo';
import { useSendRepost } from '@api/report/hooks/useSendRepost';
import { ReportSendInterface } from '@api/report/types/report.send.interface';
import { ErrorSnackbar, SuccessSnackbar } from '@components/UI/Snackbar';
import { linkConfig } from '@config/link.config';
import { useAppSelector } from '@hooks/useAppSelector';
import { useRouterPanel } from '@hooks/useRouterPanel';
import { useRouterPopout } from '@hooks/useRouterPopout';
import { useSnackbar } from '@hooks/useSnackbar';
import { useActionRef, useMeta } from '@itznevikat/router';
import { PopoutInterface } from '@routes/interface/popout.interface';
import { PanelTypes } from '@routes/structure.navigate';
import { dateService } from '@services/date/date.service';
import { errorTransformService } from '@services/error/errorTransform.service';
import { urlService } from '@services/link/url.service';
import { tapticSendSignal } from '@services/taptic-mobile/taptic.service';
import {
  Icon24Attachments,
  Icon24BookSpreadOutline,
  Icon24ClockOutline,
  Icon24ErrorCircle,
  Icon24PinOutline,
  Icon24TrashSmileOutline,
} from '@vkontakte/icons';
import { ActionSheet, ActionSheetItem, Link, Spinner } from '@vkontakte/vkui';
import { FC, useState } from 'react';
import { AlertsConfigEnum } from '../alerts.config';

type TActionPost = {
  hash: string;
};

export const ActionsPost: FC<PopoutInterface> = ({ onClose }) => {
  const { setSnackbar } = useSnackbar();
  const { actionRef } = useActionRef();
  const { pushParameter, replaceParameter } = useRouterPopout();
  const { toPanel } = useRouterPanel();
  const userId = useAppSelector((state) => state.userVk.id);

  const { hash } = useMeta<TActionPost>();
  const [isReport, setIsRepost] = useState(false);

  const { isLoading, isError, data, error } = useGetPostInfo(hash);
  const { mutateAsync: mutateReportAsync } = useSendRepost();

  if (isLoading)
    return (
      <ActionSheet
        onClose={onClose}
        header={
          <>
            <Spinner />
            Загружаем информацию о записи.
          </>
        }
        iosCloseItem={
          <ActionSheetItem autoClose mode="cancel">
            Отменить
          </ActionSheetItem>
        }
        toggleRef={actionRef}
      ></ActionSheet>
    );

  if (isError) {
    return (
      <ActionSheet
        onClose={onClose}
        header={
          <>
            <Icon24ErrorCircle />
            Не удалось загрузить информацию о записи
          </>
        }
        iosCloseItem={
          <ActionSheetItem autoClose mode="cancel">
            Отменить
          </ActionSheetItem>
        }
        toggleRef={actionRef}
      ></ActionSheet>
    );
  }
  if (!actionRef) return null;

  const onClickReport = () => {
    tapticSendSignal('success');
    setIsRepost((previousState) => !previousState);
  };

  const onClickSendReport = async (type: ReportSendInterface['type']) => {
    try {
      const send = await mutateReportAsync({
        type,
        id: type === 'walls' ? data?.hash : data?.photo.id,
      });
      const textObject = type === 'walls' ? 'запись' : 'фотографию';
      if (send?.new) {
        setSnackbar(
          <SuccessSnackbar>
            Жалоба №{send.id} на {textObject} успешно отправлена. Спасибо!
          </SuccessSnackbar>,
        );
      } else {
        setSnackbar(
          <SuccessSnackbar>
            Вы ранее отправляли жалобу на {textObject}, не дублируйте ее.
          </SuccessSnackbar>,
        );
      }
    } catch (error_) {
      setSnackbar(
        <ErrorSnackbar>
          Жалоба на {type === 'walls' ? 'запись' : 'фотографию'} не была
          отправлена. Произошла ошибка.{' '}
          {errorTransformService.getMessageError(error_)}
        </ErrorSnackbar>,
      );
    } finally {
      onClose();
      // setIsRepost(false);
    }
  };

  const onClickDeletePost = async () => {
    replaceParameter('popout', AlertsConfigEnum.PostActionConfirmDelete, {
      hash,
    });
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
              {data.pin.forever
                ? 'навсегда'
                : `до ${dateService.convertDateAndTimeToFormatPostPin(
                    data.pin.end,
                  )}`}
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
          {data?.pin && (
            <ActionSheetItem
              mode="default"
              before={<Icon24ClockOutline fill={'#ffd700'} />}
              onClick={onClickPinPost}
            >
              {!data?.pin.forever
                ? 'Продлить закрепление записи'
                : 'Просто поддержать нас'}
            </ActionSheetItem>
          )}
          <ActionSheetItem
            mode="destructive"
            subtitle={
              isLoading ? (
                <Spinner />
              ) : data?.pin ? (
                'Запись закреплена, удалить нельзя'
              ) : undefined
            }
            disabled={!!data?.pin}
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
                before={<Icon24Attachments />}
                onClick={() => onClickSendReport('photos')}
              >
                Фотография
              </ActionSheetItem>

              {data.text && (
                <ActionSheetItem
                  mode="default"
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
