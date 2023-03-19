// для удобства можно использовать enum typescript
import { IStructure } from 'react-router-vkminiapps';

export enum ViewTypes {
  MAIN = 'MAIN',
  SETTINGS = 'SETTINGS',
}

export enum PanelTypes {
  MAIN_HOME = 'MAIN_HOME',
  MAIN_ABOUT = 'MAIN_ABOUT',
  SETTINGS = 'SETTINGS',
}

const structure: IStructure = [
  {
    id: ViewTypes.MAIN,
    hash: 'main',
    panels: [
      {
        id: PanelTypes.MAIN_HOME,
        hash: '/home',
      },
      {
        id: PanelTypes.MAIN_ABOUT,
        hash: '/about',
      },
    ],
  },
];

export default structure;
