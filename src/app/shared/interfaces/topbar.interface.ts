import { IconKeys } from '../core/icons';

export interface TopbarAction {
  icon: IconKeys;
  label: string;
  action: () => void;
  badge?: number;
}

export interface TopbarUser {
  name: string;
  email: string;
  avatar?: string;
}
