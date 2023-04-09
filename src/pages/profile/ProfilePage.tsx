import { ProfileComponent } from '@components/screens/Profile/ProfileComponent';
import { PanelHeaderProfileUser } from '@components/UI/PanelHeader/PanelHeaderProfileUser';
import { useAppSelector } from '@hooks/useAppSelector';
import { PanelInterface } from '@routes/interface/panel.interface';
import { Panel } from '@vkontakte/vkui';
import { FC } from 'react';

const ProfilePage: FC<PanelInterface> = () => {
  const firstName = useAppSelector((state) => state.userVk.firstName);
  const lastName = useAppSelector((state) => state.userVk.lastName);
  const photo = useAppSelector((state) => state.userVk.photo200);
  const id = useAppSelector((state) => state.userVk.id);

  return (
    <Panel>
      <PanelHeaderProfileUser name={'Профиль'} />
      <ProfileComponent
        photo={photo}
        firstName={firstName}
        lastName={lastName}
        id={id}
      />
    </Panel>
  );
};

export default ProfilePage;
