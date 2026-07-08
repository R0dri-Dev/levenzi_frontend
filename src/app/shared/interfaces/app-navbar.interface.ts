import { IconKeys } from '../core/icons';

export interface NavbarLink {
  label: string;
  route?: string;
  url?: string;
  icon?: IconKeys;
  active?: boolean;
  children?: NavbarLink[];
}

export interface NavbarUser {
  name: string;
  email: string;
  avatar?: string;
  initials?: string;
}
