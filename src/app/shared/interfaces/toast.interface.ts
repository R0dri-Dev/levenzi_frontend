import { IconKeys } from '../core/icons';
import { LvColorVariant } from '../types';

export interface Toast {
  id: string | number;
  title?: string;
  message: string;
  variant?: LvColorVariant;
  icon?: IconKeys;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
  closable?: boolean;
}

export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
