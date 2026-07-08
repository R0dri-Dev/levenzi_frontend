import { IconKeys } from '../core/icons';

export interface ProfileMenuItem {
  label: string;
  icon?: IconKeys;
  route?: string;
  action?: () => void;
  divider?: boolean;
  danger?: boolean;
}

export interface ProfileUser {
  name: string;
  email: string;
  avatar?: string;
  initials?: string;
}
