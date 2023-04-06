import { useGetPostInfo } from '@api/posts/hooks/useGetPostInfo';
import { linkConfig } from '@config/link.config';
import { useAppSelector } from '@hooks/useAppSelector';
import { useRouterPanel } from '@hooks/useRouterPanel';
import { useActionRef, useMeta } from '@itznevikat/router';
import { PopoutInterface } from '@routes/interface/popout.interface';
import { PanelTypes } from '@routes/structure.navigate';
import { dateService } from '@services/date/date.service';
import { urlService } from '@services/link/url.service';
import { tapticSendSignal } from '@services/taptic-mobile/taptic.service';
import {
  Icon24Attachments,
  Icon24BookSpreadOutline,
  Icon24ClockOutline,
  Icon24PinOutline,
  Icon24TrashSmileOutline,
} from '@vkontakte/icons';
import { ActionSheet, ActionSheetItem, Link, Spinner } from '@vkontakte/vkui';
import { FC, useState } from 'react';

type TActionPost = {
  hash: string;
};

export const ActionsPost: FC<PopoutInterface> = ({ onClose }) => {
  const { actionRef } = useActionRef();
  const { toPanel } = useRouterPanel();
  const userId = useAppSelector((state) => state.userVk.id);

  const { hash } = useMeta<TActionPost>();
  const [isReport, setIsRepost] = useState(false);

  const { isLoading, isError, data } = useGetPostInfo(hash);

  if (isLoading) return <Spinner />;
  if (isError) return <Spinner />;
  if (!actionRef) return null;

  const onClickReport = () => {
    tapticSendSignal('success');
    setIsRepost((previousState) => !previousState);
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
          ''
        )
      }
      iosCloseItem={
        <ActionSheetItem autoClose mode="cancel">
          Отменить
        </ActionSheetItem>
      }
      toggleRef={actionRef}
    >
      {data.vk_id === userId ? (
        <>
          {!data.pin && (
            <ActionSheetItem
              mode="default"
              before={<Icon24PinOutline />}
              onClick={onClickPinPost}
              // autoClose
            >
              Закрепить запись
            </ActionSheetItem>
          )}
          {data.pin && (
            <ActionSheetItem
              mode="default"
              before={<Icon24ClockOutline fill={'#ffd700'} />}
              // autoClose
            >
              Запись закреплена{' '}
              {data.pin.forever
                ? 'навсегда'
                : 'до ' + dateService.convertDateAndTimeToFormat(data.pin.end)}
            </ActionSheetItem>
          )}

          <ActionSheetItem
            mode="destructive"
            before={<Icon24TrashSmileOutline />}
          >
            Удалить запись
          </ActionSheetItem>
        </>
      ) : (
        <>
          {isReport && (
            <>
              <ActionSheetItem mode="default" before={<Icon24Attachments />}>
                Фотография
              </ActionSheetItem>

              {data.text && (
                <ActionSheetItem
                  mode="default"
                  before={<Icon24BookSpreadOutline />}
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
