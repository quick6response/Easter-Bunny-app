// для удобства можно использовать enum typescript

import { IStructure } from '@routes/interface/structure.interface';

export enum ViewTypes {
  HOME = 'wall',
  PROFILE = 'profile',
}

export enum PanelTypes {
  MAIN_HOME = '/',
  POST_INFO = '/post',
  POST_PIN = '/postPin',
  NOT_FOUND = '/404',

  PROFILE_HOME = '/',
  PROFILE_SETTING = '/settings',
}

const structure: IStructure[] = [
  {
    id: ViewTypes.HOME,
    hash: 'main',
    panels: [
      {
        id: PanelTypes.MAIN_HOME,
        hash: '/home',
      },
      {
        id: PanelTypes.POST_INFO,
        hash: '/post',
      },
    ],
  },
  {
    id: ViewTypes.PROFILE,
    hash: 'profile',
    panels: [
      {
        id: PanelTypes.PROFILE_HOME,
        hash: '/',
      },
    ],
  },
];

export default structure;
