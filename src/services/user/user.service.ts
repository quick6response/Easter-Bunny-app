import bridge from '@vkontakte/vk-bridge';

export const UserService = {
  getInfo: async (userId?: number) => {
    try {
      return await bridge.send('VKWebAppGetUserInfo', {
        ...(userId && {
          user_id: userId,
        }),
      });
    } catch (error) {
      console.error(
        `Произошла ошибка при получение информации о пользователе. Service: userVkService`,
        error,
      );
      return null;
    }
  },
};
