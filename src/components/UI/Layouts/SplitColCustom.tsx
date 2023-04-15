import { TabbarDesktop } from '@components/UI/Tabbar/TabbarDesktop';
import { useAppSelector } from '@hooks/useAppSelector';
import { useConfirmClosePostCreate } from '@hooks/useConfirmClosePostCreate';
import { useRouterPopout } from '@hooks/useRouterPopout';
import { useSnackbar } from '@hooks/useSnackbar';
import {
  back,
  Match,
  matchPopout,
  ModalRoot,
  push,
  useInitialLocation,
  useParams,
} from '@itznevikat/router';
import { PanelTypes, ViewTypes } from '@routes/structure.navigate';
import { PopoutElement } from '@routes/structure.popout';
import {
  PanelHeader,
  Platform,
  PopoutWrapper,
  ScreenSpinner,
  SplitCol,
  SplitLayout,
  usePlatform,
} from '@vkontakte/vkui';
import { FC, ReactNode, Suspense, useLayoutEffect } from 'react';
import { ConfirmWindowCloseAlert } from '../../../modals';
import { AlertsConfigEnum } from '../../../modals/alerts.config';
import { ActionCommentPost } from '../../../modals/comment/ActionCommentPost';
import { ModalPageEnum } from '../../../modals/modals.config';
import { ActionsPost } from '../../../modals/post/ActionsPost';
import { ConfirmDeletePostAlert } from '../../../modals/post/ConfirmDeletePostAlert';
import { ModalSharePost } from '../../../modals/post/ModalSharePost';
import PostCreateModal from '../../../modals/post/PostCreateModal';
import { UsersShareModalCard } from '../../../modals/users/UsersShareModalCard';

type IParametersUrl = {
  modal: string;
  popout: string;
};

export const SplitColCustom: FC<{ children?: ReactNode }> = ({ children }) => {
  const initialLocation = useInitialLocation();
  const startHash = useAppSelector((state) => state.appSetting.hashStartApp);
  const { popout, modal } = useParams<IParametersUrl>();
  const { closeElement } = useRouterPopout();
  const { settlingHeight, backPostCreate } = useConfirmClosePostCreate();
  const { snackbar } = useSnackbar();
  const platform = usePlatform();
  const isVKCOM = platform === Platform.VKCOM;

  useLayoutEffect(() => {
    if (startHash) push(`${startHash.slice(1)}`);
  }, [startHash]);

  const currentModal = (
    <ModalRoot
      activeModal={modal}
      onClose={(modalId) => {
        if (modalId === ModalPageEnum.POST_CREATE) {
          return backPostCreate();
        }
      }}
    >
      <PostCreateModal
        nav={ModalPageEnum.POST_CREATE}
        settlingHeight={settlingHeight}
        onClose={backPostCreate}
        dynamicContentHeight
      />
      <ModalSharePost nav={ModalPageEnum.POST_SHARE} onClose={back} />
      <UsersShareModalCard nav={ModalPageEnum.PROFILE_SHARE} onClose={back} />
    </ModalRoot>
  );

  const currentPopout = matchPopout(popout, [
    <ScreenSpinner key="screen-spinner" id="screen-spinner" />,
    <ConfirmWindowCloseAlert
      key={PopoutElement.PostCreateConfirmWindowClose}
      nav={PopoutElement.PostCreateConfirmWindowClose}
      onClose={back}
    />,
    <ConfirmDeletePostAlert
      key={PopoutElement.PostActionConfirmDelete}
      nav={PopoutElement.PostActionConfirmDelete}
      onClose={back}
    />,
    <ActionsPost
      nav={PopoutElement.PostActionSheet}
      key={PopoutElement.PostActionSheet}
      onClose={() => back()}
    />,
    <ActionCommentPost
      key={PopoutElement.CommentActionSheet}
      nav={AlertsConfigEnum.CommentActionSheet}
      onClose={back}
    />,
  ]);

  return (
    <Match initialURL={ViewTypes.HOME} fallbackURL={PanelTypes.NOT_FOUND}>
      <SplitLayout
        style={{ justifyContent: 'center' }}
        header={!isVKCOM && <PanelHeader separator={false} />}
        popout={currentPopout}
        modal={currentModal}
      >
        <SplitCol
          autoSpaced
          width={isVKCOM ? '650px' : '100%'}
          maxWidth={isVKCOM ? '750px' : '100%'}
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
