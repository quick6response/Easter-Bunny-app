import { ProfileSettingComponent } from '@components/screens/ProfileSetting/ProfileSettingComponent';
import { PanelHeaderToBack } from '@components/UI/PanelHeader';
import { PanelInterface } from '@routes/interface/panel.interface';
import { Panel } from '@vkontakte/vkui';
import { FC } from 'react';

const ProfileSettingsPage: FC<PanelInterface> = ({ nav }) => {
  return (
    <Panel nav={nav}>
      <PanelHeaderToBack name="Настройки" />
      <ProfileSettingComponent />
    </Panel>
  );
};

export default ProfileSettingsPage;
