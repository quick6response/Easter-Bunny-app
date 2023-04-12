import { ModerationPostApi } from '@api/admin/moderation/moderation.post.api';
import { ModerationWallType } from '@api/admin/moderation/types/moderation.wall.type';
import { PostResponseInterface } from '@api/posts/types/post.response.interface';
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export const useVoteModerationWall = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (dto: ModerationWallType) =>
      ModerationPostApi.voteModeration(dto),

    onSuccess: async (data, variables, context) => {
      const deletePostWall = (object: InfiniteData<PostResponseInterface>) => {
        if (object?.pages) {
          for (const page of object.pages) {
            page.items = page.items.filter(
              (item) => item.hash !== variables.hash,
            );
            page.count -= 1;
            page.all -= 1;
          }
        }
        return object;
      };

      queryClient.setQueryData<InfiniteData<PostResponseInterface>>(
        ['admin', 'moderation', 'wall'],
        (oldData) => {
          return oldData ? structuredClone(deletePostWall(oldData)) : oldData;
        },
        { updatedAt: Date.now() },
      );
    },
  });
};
