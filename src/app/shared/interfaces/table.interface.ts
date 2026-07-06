// src/app/shared/interfaces/table.interface.ts
export type {
  TableAlign,
  SortDirection,
  TableVariant,
  TableSize,
  TableAction,
  TablePagination,
  TableSort,
  TableSelection,
} from '../types/table.types';

export type TableColumn<T = unknown> = import('../types/table.types').TableColumn<T>;
export type TableRowData = import('../types/table.types').TableRowData;
export type Table<T = unknown> = import('../types/table.types').Table<T>;
