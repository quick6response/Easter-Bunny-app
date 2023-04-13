import { UploadPhotoInterface } from '@api/photo/interface/upload.photo.interface';
import { PhotoApi } from '@api/photo/photo.api';
import { useMutation } from '@tanstack/react-query';

export const useUploadPhoto = () => {
  return useMutation({
    mutationFn: (dto: UploadPhotoInterface) => PhotoApi.upload(dto),
  });
};
