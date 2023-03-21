// для удобства можно использовать enum typescript
import { IStructure } from 'react-router-vkminiapps';

export enum ViewTypes {
  HOME = 'HOME',
  PROFILE = 'PROFILE',
}

export enum PanelTypes {
  MAIN_HOME = 'MAIN_HOME',
  MAIN_ABOUT = 'MAIN_ABOUT',
  PROFILE_HOME = 'PROFILE_HOME',
}

const structure: IStructure = [
  {
    id: ViewTypes.HOME,
    hash: 'main',
    panels: [
      {
        id: PanelTypes.MAIN_HOME,
        hash: '/home',
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
