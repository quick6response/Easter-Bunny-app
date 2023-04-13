import { ViewTypes } from '@routes/structure.navigate';

const homePage = `/${ViewTypes.HOME}`;
export const routerService = {
  getHashStart: (hash: string, isAdmin = false) => {
    if (hash === '#/') return homePage;
    const replaceModalAndPopout = hash?.replace(/&?(modal|popout)=\w+/g, '');
    const loverCaseHash = replaceModalAndPopout.toLowerCase();
    if (loverCaseHash.includes('admin') && !isAdmin) return homePage;

    return replaceModalAndPopout;
  },

  getParamStartUserProfile: () => {
    try {
      const parameter = JSON.parse(window.location?.search?.slice(1));
      return parameter.vk_profile_id;
    } catch {
      return null;
    }
  },
};
