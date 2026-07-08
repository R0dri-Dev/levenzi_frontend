import { IconKeys } from '../core/icons';

export interface NavbarItem {
  label: string;
  icon?: IconKeys;
  route?: string;
  action?: () => void;
  active?: boolean;
  divider?: boolean;
  danger?: boolean;
}

export interface NavbarUser {
  name: string;
  email: string;
  avatar?: string;
}
