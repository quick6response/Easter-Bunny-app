import { axiosInstance } from '@api/axios.instance';
import { PhotoCreateInterface } from '@api/photo/interface/photo.create.interface';
import { UploadPhotoInterface } from '@api/photo/interface/upload.photo.interface';
import { IRequest } from '@api/types/request.types';
import { AxiosResponse } from 'axios';

export const PhotoApi = {
  upload: async (dto: UploadPhotoInterface) => {
    const upload = await axiosInstance.post<
      UploadPhotoInterface,
      AxiosResponse<IRequest<PhotoCreateInterface>>
    >('photos/upload', dto, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return upload.data.data;
  },
};
