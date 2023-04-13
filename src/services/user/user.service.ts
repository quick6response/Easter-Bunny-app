import bridge, { UserInfo } from '@vkontakte/vk-bridge';

const setInfo = (userId: number, info: UserInfo) => {
  localStorage.setItem(`user_info_id${userId}`, JSON.stringify(info));
};

const getInfo = async (userId?: number): Promise<UserInfo | null> => {
  if (!userId) return bridge.send('VKWebAppGetUserInfo', {});

  const get = localStorage.getItem(`user_info_id${userId}`);
  if (!get) return bridge.send('VKWebAppGetUserInfo', { user_id: userId });
  return JSON.parse(get) as UserInfo;
};

export const userService = {
  getInfo: async (userId?: number) => {
    try {
      const user = await getInfo(userId);

      if (userId && user) setInfo(userId, user);

      return user;
    } catch (error) {
      console.error(
        `Произошла ошибка при получение информации о пользователе. Service: userVkService`,
        error,
      );
      return null;
    }
  },
};
