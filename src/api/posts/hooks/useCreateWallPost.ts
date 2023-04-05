import { PostCreateInterface } from '@api/posts/types/post.create.interface';
import { PostResponseInterface } from '@api/posts/types/post.response.interface';
import { WallApi } from '@api/posts/wall.api';
import { useAction } from '@hooks/useActions';
import { useAppSelector } from '@hooks/useAppSelector';
import { UserModel } from '@models/user.model';
import { postCreateActions } from '@store/post/post.create.slice';
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export const useCreateWallPost = () => {
  const postCreateAction = useAction(postCreateActions);
  const queryClient = useQueryClient();
  const user = useAppSelector((state) => state.user);

  return useMutation({
    mutationFn: (dto: PostCreateInterface) => WallApi.create(dto),
    onSuccess: async (data, variables, context) => {
      // TODO: Переписать, ибо данные там содержаться в другом формате
      await queryClient.setQueryData(
        ['posts'],
        (oldDate: InfiniteData<PostResponseInterface> | undefined) => {
          oldDate?.pages[0]?.items?.unshift({
            ...data,
            user: queryClient.getQueryData<UserModel>(['user']) || user,
          });
          return oldDate
            ? { ...oldDate, pages: [oldDate?.pages[0], ...oldDate.pages] }
            : oldDate;
        },
      );
      postCreateAction.reset();
    },
  });
};
