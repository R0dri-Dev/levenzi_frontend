import { IconKeys } from '../core/icons';

export interface UserMenuUser {
  name: string;
  email: string;
  avatar?: string;
  initials?: string;
}

export interface UserMenuItem {
  label?: string;
  icon?: IconKeys;
  route?: string;
  action?: () => void;
  danger?: boolean;
  divider?: boolean;
}
