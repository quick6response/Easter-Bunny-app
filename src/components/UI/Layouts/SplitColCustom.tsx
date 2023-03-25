import { TabbarDesktop } from '@components/UI/Tabbar/TabbarDesktop';
import { useAppSelector } from '@hooks/useAppSelector';
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
  const isHeader = useAppSelector((state) => state.appSetting.hasHeader);
  const platform = usePlatform();
  const isVKCOM = platform === Platform.VKCOM;

  return (
    <SplitLayout
      style={{ justifyContent: 'center' }}
      header={!isHeader && <PanelHeader separator={false} />}
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
      {isVKCOM && (
        <>
          <TabbarDesktop />
        </>
      )}
    </SplitLayout>
  );
};
