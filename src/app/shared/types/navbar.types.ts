// src/app/shared/types/navbar.types.ts
import type { UserIdentity } from './user.types';

export type NavbarVariant = 'default' | 'glass' | 'dark';
export type NavbarPosition = 'fixed' | 'sticky' | 'static';

export interface NavbarItem {
  label: string;
  route?: string;
  icon?: string;
  active?: boolean;
  action?: () => void;
}

export interface NavbarUser extends UserIdentity { }
