import { linkConfig } from '@config/link.config';
import { useActionRef, useMeta } from '@itznevikat/router';
import { PopoutInterface } from '@routes/interface/popout.interface';
import { urlService } from '@services/link/url.service';
import { tapticSendSignal } from '@services/taptic-mobile/taptic.service';
import {
  Icon24Attachments,
  Icon24BookSpreadOutline,
  Icon24PinOutline,
  Icon24TrashSmileOutline,
} from '@vkontakte/icons';
import { ActionSheet, ActionSheetItem, Link } from '@vkontakte/vkui';
import { FC, useState } from 'react';

type TActionPost = {
  myPost: boolean;
  hash?: string;
  photoId?: string;
};

export const ActionsPost: FC<PopoutInterface> = ({ onClose }) => {
  const { actionRef } = useActionRef();
  const { myPost, hash, photoId } = useMeta<TActionPost>();
  const [isReport, setIsRepost] = useState(false);

  if (!actionRef) return null;

  const onClickReport = () => {
    tapticSendSignal('success');
    setIsRepost((previousState) => !previousState);
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
      {myPost ? (
        <>
          <ActionSheetItem mode="default" before={<Icon24PinOutline />}>
            Закрепить запись
          </ActionSheetItem>
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
              {photoId && (
                <ActionSheetItem mode="default" before={<Icon24Attachments />}>
                  Фотография
                </ActionSheetItem>
              )}
              {hash && (
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
