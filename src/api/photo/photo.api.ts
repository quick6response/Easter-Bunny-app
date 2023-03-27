import { axiosInstance } from '@api/axios.instance';
import { UploadPhotoInterface } from '@api/photo/interface/upload.photo.interface';
import { IRequest } from '@api/types/request.types';
import { PostAttachmentModel } from '@models/post.model';
import { AxiosResponse } from 'axios';

export const PhotoApi = {
  upload: async (dto: UploadPhotoInterface) => {
    const upload = await axiosInstance.post<
      UploadPhotoInterface,
      AxiosResponse<IRequest<PostAttachmentModel>>
    >('photos/upload', dto, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return upload.data.data;
  },
};
