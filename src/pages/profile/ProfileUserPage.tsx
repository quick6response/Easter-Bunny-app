import { ProfileUserComponent } from '@components/screens/ProfileUser/ProfileUserComponent';
import { useParams } from '@itznevikat/router';
import { PanelInterface } from '@routes/interface/panel.interface';
import { Group, Panel, Placeholder } from '@vkontakte/vkui';
import { FC, useEffect, useState } from 'react';

const ProfileUserPage: FC<PanelInterface> = ({ nav }) => {
  const { userId } = useParams<{ userId: string }>();
  const [saveUserId, setSaveUserId] = useState(userId);

  useEffect(() => {
    if (userId?.replace(/\D/g, '')) setSaveUserId(userId?.replace(/\D/g, ''));
  }, [userId]);

  if (!saveUserId)
    return (
      <Panel nav={nav}>
        <Group>
          <Placeholder>Не передан id пользователя.</Placeholder>
        </Group>
      </Panel>
    );

  return (
    <Panel nav={nav}>
      <ProfileUserComponent userId={saveUserId} />
    </Panel>
  );
};

export default ProfileUserPage;
