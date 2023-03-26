import { TabbarDesktop } from '@components/UI/Tabbar/TabbarDesktop';
import { useSnackbar } from '@hooks/useSnackbar';
import { Match } from '@itznevikat/router';
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

export const SplitColCustom: FC<{ children?: ReactNode }> = ({ children }) => {
  const { snackbar } = useSnackbar();
  const platform = usePlatform();
  const isVKCOM = platform === Platform.VKCOM;

  return (
    <Match initialURL={ViewTypes.HOME}>
      <SplitLayout
        style={{ justifyContent: 'center' }}
        header={!isVKCOM && <PanelHeader separator={false} />}
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
