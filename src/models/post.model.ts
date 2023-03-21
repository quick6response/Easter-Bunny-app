export interface PostModel {
  id: number;
  attachments: PostAttachment;
  userId: number;
  like: number;
}

export type PostAttachment = string[];
