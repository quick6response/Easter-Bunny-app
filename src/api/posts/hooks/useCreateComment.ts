import { CommentApi } from '@api/posts/comment.api';
import { CommentCreateInterface } from '@api/posts/types/comment.create.interface';
import { useMutation } from '@tanstack/react-query';

export const useCreateComment = () => {
  return useMutation({
    mutationFn: (dto: CommentCreateInterface) => CommentApi.create(dto),
  });
};
