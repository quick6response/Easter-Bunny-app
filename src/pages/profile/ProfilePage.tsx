import { useGetCountLikeProfile } from '@api/profile/hooks/useGetCountLikeProfile';
import { useGetPostsProfile } from '@api/profile/hooks/useGetPostsProfile';
import { ProfileBlockComponent } from '@components/screens/Profile/ProfileBlockComponent';
import { PanelHeaderMyProfile } from '@components/UI/PanelHeader/PanelHeaderMyProfile';
import { PanelInterface } from '@routes/interface/panel.interface';
import { Panel } from '@vkontakte/vkui';
import { FC } from 'react';

const ProfilePage: FC<PanelInterface> = () => {
  const userProfile = useGetPostsProfile();
  const userLike = useGetCountLikeProfile();

  return (
    <Panel>
      <PanelHeaderMyProfile name="Профиль" />
      <ProfileBlockComponent post={userProfile} like={userLike} />
    </Panel>
  );
};

export default ProfilePage;
