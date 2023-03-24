// для удобства можно использовать enum typescript
import { IStructure } from 'react-router-vkminiapps';

export enum ViewTypes {
  HOME = 'HOME',
  PROFILE = 'PROFILE',
}

export enum PanelTypes {
  MAIN_HOME = 'MAIN_HOME',
  POST_INFO = 'POST_INFO',
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
      {
        id: PanelTypes.MAIN_HOME,
        hash: '/post=%{id}',
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
