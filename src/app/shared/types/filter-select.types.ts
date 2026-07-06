// src/app/shared/types/filter-select.types.ts
export type FilterSelectVariant = 'primary' | 'secondary';
export type FilterSelectSize = 'sm' | 'md' | 'lg';

export interface FilterSelectOption {
  value: string;
  label: string;
  icon?: string;
}
