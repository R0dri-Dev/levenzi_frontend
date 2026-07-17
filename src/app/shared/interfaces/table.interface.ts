import { IconKeys } from '../core/icons';
import { LvColorVariant, LvSize } from '../types';

export interface TableColumn<T = unknown> {
  key: string;
  label: string;
  align?: 'left' | 'center' | 'right';
  width?: string;
  sortable?: boolean;
  hidden?: boolean;
  render?: (item: T) => unknown;
  cellClass?: string;
}

export interface TableAction<T = unknown> {
  label: string;
  icon?: IconKeys;
  action: (item: T) => void;
  variant?: LvColorVariant;
  size?: LvSize;
  disabled?: (item: T) => boolean;
  visible?: (item: T) => boolean;
}

export interface TablePagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages?: number;
}

export interface TableSort {
  field: string;
  direction: 'asc' | 'desc';
}

export interface TableFlagContent {
  type: 'flag';
  iso2: string;   // ej: 'pe', 'bo'
  text: string;   // ej: '+51 987654321'
}
