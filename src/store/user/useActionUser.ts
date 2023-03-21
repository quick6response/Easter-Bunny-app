import { useAction } from '../../hooks/useActions';
import { userVkActions } from './user.vk.slice';

export const useActionUser = () => {
  const user = useAction(userVkActions);
};
