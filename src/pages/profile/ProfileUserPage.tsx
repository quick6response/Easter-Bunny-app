import { ProfileUserComponent } from '@components/screens/ProfileUser/ProfileUserComponent';
import { useParams } from '@itznevikat/router';
import { PanelInterface } from '@routes/interface/panel.interface';
import { Panel } from '@vkontakte/vkui';
import { FC } from 'react';

const ProfileUserPage: FC<PanelInterface> = ({ nav }) => {
  const { userId } = useParams<{ userId: string }>();

  return (
    <Panel nav={nav}>
      <ProfileUserComponent userId={userId} />
    </Panel>
  );
};

export default ProfileUserPage;
