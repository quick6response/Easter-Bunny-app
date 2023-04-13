import { useAction } from '@hooks/useActions';
import { userSliceActions } from '@store/user/user.slice';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AuthApi } from './auth.api';

export const useAuthUser = () => {
  const queryClient = useQueryClient();
  const userAction = useAction(userSliceActions);
  return useMutation({
    mutationFn: async () => AuthApi.login(),
    onSuccess: (user) => {
      queryClient.setQueryData(['user'], user);
      console.log(user);
      userAction.setUser(user);
    },
  });
};
