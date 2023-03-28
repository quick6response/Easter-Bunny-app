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
  ...properties
}) => {
  const platform = usePlatform();

  return (
    <ModalPage
      onClose={onClose}
      header={
        <ModalPageHeader
          before={
            <>
              {platform === Platform.ANDROID && (
                <>
                  <PanelHeaderClose onClick={onClose} />
                  {button}
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
                  <PanelHeaderButton onClick={onClose}>
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
