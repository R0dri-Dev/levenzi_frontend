// src/app/shared/types/navbar.types.ts
import { IconKeys } from '../core/icons';
import type { UserIdentity } from './user.types';

export type NavbarVariant = 'default' | 'glass';
export type NavbarPosition = 'fixed' | 'sticky' | 'static';

export interface NavbarItem {
  label: string;
  route?: string;
  icon?: IconKeys;
  active?: boolean;
  action?: () => void;
  divider?: boolean;
  danger?: boolean;
}

export interface NavbarUser extends UserIdentity { }
