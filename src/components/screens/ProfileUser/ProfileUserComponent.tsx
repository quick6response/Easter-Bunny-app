import { useGetCountLikeProfileUser } from '@api/profile/hooks/useGetCountLikeProfileUser';
import { useGetProfileUser } from '@api/profile/hooks/useGetProfileUser';
import { ProfileBlockComponent } from '@components/screens/Profile/ProfileBlockComponent';
import { PanelHeaderToBack } from '@components/UI/PanelHeader';
import { PanelHeaderProfileUser } from '@components/UI/PanelHeader/PanelHeaderProfileUser';
import { ScreenSpinner } from '@vkontakte/vkui';
import { FC } from 'react';

export const ProfileUserComponent: FC<{ userId: string }> = ({ userId }) => {
  const getPostsUser = useGetProfileUser(userId);
  const getLikeUser = useGetCountLikeProfileUser(userId);

  if (!userId)
    return (
      <>
        <PanelHeaderToBack name={`не указан`} />
        <ScreenSpinner></ScreenSpinner>;
      </>
    );

  return (
    <>
      <PanelHeaderProfileUser name={`@id${userId}`} />

      <ProfileBlockComponent post={getPostsUser} like={getLikeUser} />
    </>
  );
};
