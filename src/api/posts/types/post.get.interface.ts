import { THomeTab } from '@store/wall/wall.panel.slice';

export interface WallGetInterface {
  last_date: string;
  count?: number;
  offset: number;
  tab?: THomeTab;
}

// /walls/top
// /walls/pin
