// src/app/shared/types/filter-select.types.ts
import type { IconKeys } from '../core/icons';

export type FilterSelectVariant = 'primary' | 'secondary';
export type FilterSelectSize = 'sm' | 'md' | 'lg';

export interface FilterSelectOption {
  value: string;
  label: string;
  icon?: IconKeys;
}
