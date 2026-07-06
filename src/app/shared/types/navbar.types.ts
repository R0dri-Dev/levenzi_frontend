// src/app/shared/types/navbar.types.ts
export type NavbarVariant = 'default' | 'glass' | 'dark';
export type NavbarPosition = 'fixed' | 'sticky' | 'static';

export interface NavbarItem {
  label: string;
  route?: string;
  icon?: string;
  active?: boolean;
  action?: () => void;
}

export interface NavbarUser {
  name: string;
  email: string;
  avatar?: string;
  initials?: string;
}
