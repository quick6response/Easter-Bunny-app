import { Icon24Dismiss } from '@vkontakte/icons';
import {
  ModalPage,
  ModalPageHeader,
  ModalPageProps,
  NavIdProps,
  PanelHeaderButton,
  PanelHeaderClose,
  usePlatform,
} from '@vkontakte/vkui';
import { Platform } from '@vkontakte/vkui/dist/lib/platform';
import { FC, PropsWithChildren, ReactNode } from 'react';

interface IModalPageComponent extends NavIdProps {
  onClose: () => void;
  // заголовок окна
  name: ReactNode;
  // дополнительные кнопки
  before?: ReactNode;
  after?: ReactNode;
  // сама будет определять свое положение относительно платформы
  button?: ReactNode;
}
type IModalPage = ModalPageProps & IModalPageComponent;

export const ModalPageComponent: FC<PropsWithChildren<IModalPage>> = ({
  onClose,
  name,
  children,
  button,
  nav,
  ...properties
}) => {
  const platform = usePlatform();

  return (
    <ModalPage
      nav={nav}
      onClose={onClose}
      header={
        <ModalPageHeader
          before={
            <>
              {platform === Platform.ANDROID && (
                <>
                  <PanelHeaderClose onClick={onClose} />
                </>
              )}
              {(platform === Platform.VKCOM || platform === Platform.IOS) && (
                <>{button}</>
              )}
            </>
          }
          after={
            <>
              {platform === Platform.IOS && (
                <>
                  <PanelHeaderButton
                    onClick={onClose}
                    aria-label="Закрыть карточку"
                  >
                    <Icon24Dismiss />
                  </PanelHeaderButton>
                </>
              )}
              {platform === Platform.ANDROID && <>{button}</>}
            </>
          }
        >
          {name}
        </ModalPageHeader>
      }
      {...properties}
    >
      {children}
    </ModalPage>
  );
};
