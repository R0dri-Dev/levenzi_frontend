// src/app/shared/types/user-menu.types.ts
export interface UserMenuItem {
  label: string;
  icon?: string;
  action?: () => void;
  route?: string;
  divider?: boolean;
  danger?: boolean;
}

export interface UserMenuUser {
  name: string;
  email: string;
  avatar?: string;
  initials?: string;
}
