import { ViewTypes } from '@routes/structure.navigate';

const homePage = `/${ViewTypes.HOME}`;
export const routerService = {
  getParamStart: (hash: string, isAdmin = false) => {
    console.log(hash);
    if (hash === '#/') return homePage;
    const replaceModalAndPopout = hash?.replace(/&?(modal|popout)=\w+/g, '');
    const loverCaseHash = replaceModalAndPopout.toLowerCase();
    if (loverCaseHash.includes('admin') && !isAdmin) return homePage;

    return replaceModalAndPopout;
  },
};
