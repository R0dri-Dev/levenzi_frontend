import type { SortDirection, TableAlign } from '../types/table.types';

export interface TableColumn<T = unknown> {
  header: string;
  accessor: keyof T | ((row: T) => unknown);
  align?: TableAlign;
  sortable?: boolean;
}

export interface TableRowData {
  id?: number | string;
}

export interface Table<T = unknown> {
  columns: Array<TableColumn<T>>;
  rows: Array<T & TableRowData>;
  sortBy?: string;
  sortDirection?: SortDirection;
}

