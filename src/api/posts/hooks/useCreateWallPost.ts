import { PostApi } from '@api/posts/post.api';
import { PostCreateInterface } from '@api/posts/types/post.create.interface';
import { useAction } from '@hooks/useActions';
import { useAppSelector } from '@hooks/useAppSelector';
import { postCreateActions } from '@store/post/post.create.slice';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateWallPost = () => {
  const postCreateAction = useAction(postCreateActions);
  const queryClient = useQueryClient();
  const user = useAppSelector((state) => state.user);

  return useMutation({
    mutationFn: (dto: PostCreateInterface) => PostApi.create(dto),
    onSuccess: async (data, variables, context) => {
      // TODO: Переписать, ибо данные там содержаться в другом формате
      // queryClient.setQueryData(
      //   ['posts'],
      //   (oldData: InfiniteData<PostResponseInterface> | undefined) => {
      //     oldData?.pages.at(0)?.items?.unshift({
      //       ...data,
      //       user: queryClient.getQueryData<UserModel>(['user']) || user,
      //     });
      //     // if (copyData?.pages[0]?.count) copyData.pages[0].count += 1;
      //     return oldData ? { ...oldData } : oldData;
      //   },
      // );
      postCreateAction.reset();

      await queryClient.invalidateQueries(['posts']);
    },
  });
};
