// src/app/shared/types/table.types.ts
import type { HorizontalAlignment } from './alignment.types';

export type TableAlign = HorizontalAlignment;
export type SortDirection = 'asc' | 'desc';
export type TableVariant = 'default' | 'striped' | 'bordered' | 'hover';
export type TableSize = 'sm' | 'md' | 'lg';

// ===== INTERFAZ PARA EL COMPONENTE TABLE =====
export interface TableColumn<T = any> {
  key: string;                    
  label: string;                  
  align?: TableAlign;
  width?: string;
  sortable?: boolean;
  hidden?: boolean;               
  render?: (item: T) => string;   
  cellClass?: string;
  headerClass?: string;
}

// ===== INTERFAZ PARA DATOS =====
export interface TableRowData {
  id?: number | string;
}

// ===== INTERFAZ PARA TABLA SIMPLE =====
export interface Table<T = unknown> {
  columns: Array<TableColumn<T>>;
  rows: Array<T & TableRowData>;
  sortBy?: string;
  sortDirection?: SortDirection;
}

// ===== TIPOS PARA ACCIONES =====
export interface TableAction<T = any> {
  label: string;
  icon?: string;
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  visible?: (item: T) => boolean;
  disabled?: (item: T) => boolean;
  action: (item: T) => void;
}

export interface TablePagination {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  totalPages: number;
}

export interface TableSort {
  field: string;
  direction: SortDirection;
}

export interface TableSelection {
  selected: any[];
  selectAll: boolean;
}
