import { TabbarDesktop } from '@components/UI/Tabbar/TabbarDesktop';
import { useSnackbar } from '@hooks/useSnackbar';
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

export const SplitColCustom: FC<{ children: ReactNode }> = ({ children }) => {
  const { snackbar } = useSnackbar();
  const platform = usePlatform();
  const isVKCOM = platform === Platform.VKCOM;

  return (
    <SplitLayout
      style={{ justifyContent: 'center' }}
      header={!isVKCOM && <PanelHeader separator={false} />}
    >
      <SplitCol
        spaced={isVKCOM}
        animate={isVKCOM}
        width={isVKCOM ? '650px' : '100%'}
        maxWidth={isVKCOM ? '650px' : '100%'}
        stretchedOnMobile={!isVKCOM}
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
          {snackbar}
          {children}
        </Suspense>
      </SplitCol>
      {/*{isVKCOM && (*/}
      {/*  <>*/}
      {isVKCOM && <TabbarDesktop />}
      {/*  </>*/}
      {/*)}*/}
    </SplitLayout>
  );
};
