import { axiosInstance } from '@api/axios.instance';
import { IRequest } from '@api/types/request.types';
import { ProductModel } from '@models/product.model';

export const ShopApi = {
  getProduct: async () => {
    const get = await axiosInstance.get<IRequest<ProductModel[]>>('walls/shop');

    return get.data.data;
  },
};
