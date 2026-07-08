import { IconKeys } from '../core/icons';
import { LvColorVariant } from '../types';

export interface Notification {
  id: string | number;
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon?: IconKeys;
  variant?: LvColorVariant;
  link?: string;
  action?: () => void;
}
