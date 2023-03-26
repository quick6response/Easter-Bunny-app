import { TabbarDesktop } from '@components/UI/Tabbar/TabbarDesktop';
import { useSnackbar } from '@hooks/useSnackbar';
import {
  back,
  Match,
  matchPopout,
  ModalRoot,
  useParams,
} from '@itznevikat/router';
import { ViewTypes } from '@routes/structure.navigate';
import {
  PanelHeader,
  Platform,
  PopoutWrapper,
  ScreenSpinner,
  SplitCol,
  SplitLayout,
  usePlatform,
} from '@vkontakte/vkui';
import { FC, ReactNode, Suspense } from 'react';
import { ModalPageConfig } from '../../../modals/config';
import PostCreateModal from '../../../modals/post/PostCreateModal';

type IParametersUrl = {
  modal: string;
  popout: string;
};

export const SplitColCustom: FC<{ children?: ReactNode }> = ({ children }) => {
  const { popout, modal } = useParams<IParametersUrl>();
  const { snackbar } = useSnackbar();
  const platform = usePlatform();
  const isVKCOM = platform === Platform.VKCOM;

  const currentModal = (
    <ModalRoot>
      <PostCreateModal
        onClose={() => back()}
        nav={ModalPageConfig.PostCreate}
        settlingHeight={100}
      />
    </ModalRoot>
  );

  const currentPopout = matchPopout(popout, [
    <ScreenSpinner key="screen-spinner" id="screen-spinner" />,
  ]);

  return (
    <Match initialURL={ViewTypes.HOME}>
      <SplitLayout
        style={{ justifyContent: 'center' }}
        header={!isVKCOM && <PanelHeader separator={false} />}
        popout={currentPopout}
        modal={currentModal}
      >
        <SplitCol
          autoSpaced
          width={650}
          maxWidth={650}
          spaced={isVKCOM}
          animate
        >
          <Suspense
            fallback={
              <>
                <PopoutWrapper alignY="center" alignX="center">
                  <ScreenSpinner state="loading">
                    <div>Загрузка панели, подождите пожалуйста...</div>
                  </ScreenSpinner>
                </PopoutWrapper>
              </>
            }
          >
            {children}
          </Suspense>
          {snackbar}
        </SplitCol>
        {isVKCOM && <TabbarDesktop />}
      </SplitLayout>
    </Match>
  );
};
