// src/app/shared/types/app-sidebar.types.ts
import type { IconKeys } from '../core/icons';

export type AppSidebarVariant = 'default' | 'dark' | 'compact';
export type AppSidebarPosition = 'left' | 'right';

export interface AppSidebarItem {
  label: string;
  route?: string;
  icon?: IconKeys;
  active?: boolean;
  children?: AppSidebarItem[];
  divider?: boolean;
  badge?: string | number;
  badgeColor?: 'primary' | 'success' | 'danger' | 'warning' | 'info';
  permission?: string;
}
