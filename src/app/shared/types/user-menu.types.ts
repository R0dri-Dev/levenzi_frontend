// src/app/shared/types/user-menu.types.ts
import type { IconKeys } from '../core/icons';
import type { UserIdentity } from './user.types';

export interface UserMenuItem {
  label: string;
  icon?: IconKeys;
  action?: () => void;
  route?: string;
  divider?: boolean;
  danger?: boolean;
}

export interface UserMenuUser extends UserIdentity { }
