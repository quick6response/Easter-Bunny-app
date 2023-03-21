import { TabbarDesktop } from '@components/UI/Tabbar/TabbarDesktop';
import { useSnackbar } from '@hooks/useSnackbar';
import {
  PanelHeader,
  Platform,
  SplitCol,
  SplitLayout,
  usePlatform,
} from '@vkontakte/vkui';
import { FC, ReactNode } from 'react';

export const SplitColCustom: FC<{ children: ReactNode }> = ({ children }) => {
  const platform = usePlatform();
  const { snackbar } = useSnackbar();
  const isVKCOM = platform === Platform.VKCOM;

  return (
    <SplitLayout
      style={{ justifyContent: 'center' }}
      header={true && <PanelHeader separator={false} />}
    >
      <SplitCol
        spaced={isVKCOM}
        animate={isVKCOM}
        width={isVKCOM ? '650px' : '100%'}
        maxWidth={isVKCOM ? '650px' : '100%'}
        stretchedOnMobile={!isVKCOM}
      >
        {children}
        {snackbar}
      </SplitCol>
      {isVKCOM && <TabbarDesktop />}
    </SplitLayout>
  );
};
