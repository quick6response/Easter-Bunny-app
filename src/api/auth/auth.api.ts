import { configAxiosAuth } from '@api/config/axios.config';
import { IRequest } from '@api/types/request.types';
import { UserModel } from '@models/user.model';

export const AuthApi = {
  login: async () => {
    const user = await configAxiosAuth.get<IRequest<UserModel>>('auth/login');
    return user.data.data;
  },
};
