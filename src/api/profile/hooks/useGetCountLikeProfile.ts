import { ProfileApi } from '@api/profile/profile.api';
import { useQuery } from '@tanstack/react-query';

export const useGetCountLikeProfile = () => {
  return useQuery({
    queryKey: ['my', 'profile', 'count_like'],
    queryFn: () => ProfileApi.getCountLikes(),
    staleTime: 2 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
  });
};
