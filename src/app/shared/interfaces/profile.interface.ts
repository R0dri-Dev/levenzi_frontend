import { IconKeys } from '../core/icons';

export type ProfileMenuItem =
  | { divider: true }
  | {
      divider?: false;
      label: string;
      icon?: IconKeys;
      route?: string;
      action?: () => void;
      danger?: boolean;
    };

export interface ProfileUser {
  name: string;
  email: string;
  avatar?: string;
  initials?: string;
}
