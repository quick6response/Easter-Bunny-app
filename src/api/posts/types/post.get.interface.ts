import { THomeTab } from '@store/wall/wall.panel.slice';

export interface PostGetInterface {
  last_date: string;
  count: number;
  offset: number;
  tab?: THomeTab;
}

// /walls/top
// /walls/pin
