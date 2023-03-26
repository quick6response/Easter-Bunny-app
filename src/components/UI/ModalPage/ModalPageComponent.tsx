import { Icon24Dismiss } from '@vkontakte/icons';
import {
  ModalPage,
  ModalPageHeader,
  ModalPageProps,
  NavIdProps,
  PanelHeaderButton,
  PanelHeaderClose,
  useAdaptivity,
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
}
type IModalPage = ModalPageProps & IModalPageComponent;

/**
 * Обертка над всеми модальными окнами
 * @param onClose
 * @param before
 * @param after
 * @param name
 * @param children
 * @param properties
 * @constructor
 */
export const ModalPageComponent: FC<PropsWithChildren<IModalPage>> = ({
  onClose,
  before,
  after,
  name,
  children,

  ...properties
}) => {
  const { viewWidth } = useAdaptivity();
  const platform = usePlatform();

  return (
    <ModalPage
      onClose={onClose}
      header={
        <ModalPageHeader
          before={
            before ??
            (platform === Platform.ANDROID && (
              <>
                <PanelHeaderClose onClick={onClose} />
              </>
            ))
          }
          after={
            <>
              {after ??
                (platform === Platform.IOS && (
                  <>
                    <PanelHeaderButton onClick={onClose}>
                      <Icon24Dismiss />
                    </PanelHeaderButton>
                  </>
                ))}
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
