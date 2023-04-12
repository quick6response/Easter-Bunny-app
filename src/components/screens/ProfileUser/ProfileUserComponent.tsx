import { useGetCountLikeProfileUser } from '@api/profile/hooks/useGetCountLikeProfileUser';
import { useGetProfileUser } from '@api/profile/hooks/useGetProfileUser';
import { ProfileBlockComponent } from '@components/screens/Profile/ProfileBlockComponent';
import { PanelHeaderToBack } from '@components/UI/PanelHeader';
import { ScreenSpinner } from '@vkontakte/vkui';
import { FC } from 'react';

export const ProfileUserComponent: FC<{ userId: string }> = ({ userId }) => {
  const getPostsUser = useGetProfileUser(userId);
  const getLikeUser = useGetCountLikeProfileUser(userId);

  if (!userId) return <ScreenSpinner></ScreenSpinner>;

  return (
    <>
      <PanelHeaderToBack name={`@id${userId}`} />

      <ProfileBlockComponent post={getPostsUser} like={getLikeUser} />
    </>
  );
};
