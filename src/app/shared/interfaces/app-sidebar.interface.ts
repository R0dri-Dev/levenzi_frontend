import { IconKeys } from '../core/icons';
import { LvColorVariant } from '../types';

export interface AppSidebarItem {
  label: string;
  icon?: IconKeys;
  route?: string;
  action?: () => void;
  active?: boolean;
  badge?: string | number;
  badgeColor?: LvColorVariant;
  divider?: boolean;
  children?: AppSidebarItem[];
}
