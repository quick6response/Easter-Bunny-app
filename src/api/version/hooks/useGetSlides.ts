import { VersionApi } from '@api/version/version.api';
import { useMutation } from '@tanstack/react-query';

export const useGetSlides = () => {
  return useMutation({
    mutationFn: (version: string) => VersionApi.get(version),
    mutationKey: ['app', 'slides'],
  });
};
