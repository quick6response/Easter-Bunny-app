import { ProfileApi } from '@api/profile/profile.api';
import { useQuery } from '@tanstack/react-query';

export const useGetCountLikeProfileUser = (userId: string) => {
  return useQuery({
    queryKey: [userId, 'profile', 'count_like'],
    queryFn: () => ProfileApi.getCountLikes(userId),
    staleTime: 2 * 60 * 1000,
    cacheTime: 5 * 60 * 1000,
    enabled: !!userId,
    retry: false,
  });
};
