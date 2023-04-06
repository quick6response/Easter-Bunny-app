import { axiosInstance } from '@api/axios.instance';
import { IRequest } from '@api/types/request.types';
import { SlidesModel } from '@models/slides.model';

export const VersionApi = {
  get: async (version: string) => {
    const getVersion = await axiosInstance.get<IRequest<SlidesModel[]>>(
      `/versions/${version}/slides`,
    );

    return getVersion.data.data;
  },
};
