import { ShopApi } from '@api/shop/shop.api';
import { useQuery } from '@tanstack/react-query';

export const useGetProducts = () => {
  return useQuery({
    queryKey: ['shop', 'product'],
    queryFn: () => ShopApi.getProduct(),
    cacheTime: 2 * 60 * 1000,
    staleTime: 1 * 60 * 1000,
  });
};
