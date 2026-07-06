import { Component, computed, input, output, signal, effect, model } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LvButtonComponent } from '../../atoms/button/button';
import { LvBadgeComponent } from '../../atoms/badge/badge';
import { LvEmptyStateComponent } from '../empty-state/empty-state';
import { LvIconButtonComponent } from '../../atoms/icon-button/icon-button';

import {
  LV_TABLE_BASE,
  LV_TABLE_WRAPPER,
  LV_TABLE_VARIANTS,
  LV_TABLE_HEAD,
  LV_TABLE_HEAD_CELL,
  LV_TABLE_HEAD_CELL_SIZES,
  LV_TABLE_HEAD_CELL_ALIGN,
  LV_TABLE_BODY,
  LV_TABLE_ROW,
  LV_TABLE_ROW_SELECTED,
  LV_TABLE_CELL,
  LV_TABLE_CELL_SIZES,
  LV_TABLE_CELL_ALIGN,
  LV_TABLE_EMPTY,
  LV_TABLE_CHECKBOX,
  LV_TABLE_SORT_ICON,
  LV_TABLE_SORT_ACTIVE,
  LV_TABLE_PAGINATION,
  LV_TABLE_PAGINATION_INFO,
  LV_TABLE_PAGINATION_BUTTONS,
  LV_TABLE_PAGINATION_BUTTON,
  LV_TABLE_PAGINATION_BUTTON_ACTIVE,
} from '../../../theme/table.theme';
import type {
  TableColumn,
  TableAction,
  TablePagination,
  TableSort,
  TableVariant,
  TableSize
} from '../../../types/table.types';
import { LvIconComponent } from '../../icons/icon/icon';

@Component({
  selector: 'lv-table',
  standalone: true,
  imports: [
    CommonModule,
    LvIconComponent,
    LvButtonComponent,
    LvBadgeComponent,
    LvEmptyStateComponent,
    LvIconButtonComponent
  ],
  templateUrl: './table.html',
  styleUrl: './table.css',
})
export class LvTableComponent<T = unknown> {
  // Inputs
  readonly data = input.required<T[]>();
  readonly columns = input.required<TableColumn<T>[]>();
  readonly variant = input<TableVariant>('default');
  readonly size = input<TableSize>('md');
  readonly loading = input(false);
  readonly emptyMessage = input<string>('No hay datos disponibles');
  readonly actions = input<TableAction<T>[]>([]);
  readonly selectable = input(false);
  readonly pagination = input<TablePagination>();
  readonly sort = model<TableSort | null>(null);

  // Outputs
  readonly onRowClick = output<T>();
  readonly onSort = output<TableSort>();
  readonly onPageChange = output<number>();
  readonly onSelectionChange = output<T[]>();

  // State
  private selectedItems = signal<T[]>([]);
  private selectAll = signal(false);

  // Computed
  readonly visibleColumns = computed(() => {
    return this.columns().filter(col => !col.hidden);
  });

  readonly hasActions = computed(() => {
    return this.actions().length > 0;
  });

  readonly totalItems = computed(() => {
    return this.pagination()?.totalItems || this.data().length;
  });

  readonly classes = computed(() => {
    const base = LV_TABLE_BASE;
    const variant = LV_TABLE_VARIANTS[this.variant()];
    return {
      wrapper: LV_TABLE_WRAPPER,
      table: [base, variant].filter(Boolean).join(' '),
      head: LV_TABLE_HEAD,
      headCell: (col: TableColumn<T>) => {
        const size = LV_TABLE_HEAD_CELL_SIZES[this.size()];
        const align = LV_TABLE_HEAD_CELL_ALIGN[col.align || 'left'];
        return [LV_TABLE_HEAD_CELL, size, align].filter(Boolean).join(' ');
      },
      body: LV_TABLE_BODY,
      row: (item: T) => {
        const selected = this.isSelected(item) ? LV_TABLE_ROW_SELECTED : '';
        return [LV_TABLE_ROW, selected].filter(Boolean).join(' ');
      },
      cell: (col: TableColumn<T>) => {
        const size = LV_TABLE_CELL_SIZES[this.size()];
        const align = LV_TABLE_CELL_ALIGN[col.align || 'left'];
        return [LV_TABLE_CELL, size, align].filter(Boolean).join(' ');
      },
      empty: LV_TABLE_EMPTY,
      checkbox: LV_TABLE_CHECKBOX,
      sortIcon: LV_TABLE_SORT_ICON,
      sortActive: LV_TABLE_SORT_ACTIVE,
      pagination: LV_TABLE_PAGINATION,
      paginationInfo: LV_TABLE_PAGINATION_INFO,
      paginationButtons: LV_TABLE_PAGINATION_BUTTONS,
      paginationButton: (active: boolean) => {
        return [LV_TABLE_PAGINATION_BUTTON, active ? LV_TABLE_PAGINATION_BUTTON_ACTIVE : '']
          .filter(Boolean).join(' ');
      },
    };
  });

  // Lifecycle
  constructor() {
    effect(() => {
      // Reset selection when data changes
      if (this.selectable()) {
        this.selectedItems.set([]);
        this.selectAll.set(false);
      }
    });
  }

  // Methods
  getCellValue(item: T, column: TableColumn<T>): unknown {
    const value = (item as any)[column.key];
    return column.render ? column.render(item) : value;
  }

  getSortDirection(field: string): 'asc' | 'desc' | null {
    const sort = this.sort();
    if (!sort || sort.field !== field) return null;
    return sort.direction;
  }

  toggleSort(field: string): void {
    const currentSort = this.sort();
    let direction: 'asc' | 'desc' = 'asc';

    if (currentSort && currentSort.field === field) {
      direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
    }

    const newSort: TableSort = { field, direction };
    this.sort.set(newSort);
    this.onSort.emit(newSort);
  }

  isSelected(item: T): boolean {
    return this.selectedItems().includes(item);
  }

  toggleSelection(item: T): void {
    const selected = this.selectedItems();
    const index = selected.indexOf(item);

    if (index === -1) {
      selected.push(item);
    } else {
      selected.splice(index, 1);
    }

    this.selectedItems.set([...selected]);
    this.updateSelectAll();
    this.onSelectionChange.emit(this.selectedItems());
  }

  toggleSelectAll(): void {
    const selectAll = !this.selectAll();
    this.selectAll.set(selectAll);

    if (selectAll) {
      this.selectedItems.set([...this.data()]);
    } else {
      this.selectedItems.set([]);
    }

    this.onSelectionChange.emit(this.selectedItems());
  }

  private updateSelectAll(): void {
    const data = this.data();
    const selected = this.selectedItems();
    this.selectAll.set(data.length > 0 && selected.length === data.length);
  }

  isActionDisabled(action: TableAction<T>, item: T): boolean {
    return action.disabled ? action.disabled(item) : false;
  }

  isActionVisible(action: TableAction<T>, item: T): boolean {
    return action.visible ? action.visible(item) : true;
  }

  handleRowClick(item: T): void {
    this.onRowClick.emit(item);
  }

  handlePageChange(page: number): void {
    if (this.pagination()) {
      this.onPageChange.emit(page);
    }
  }

  getTotalPages(): number {
    const pagination = this.pagination();
    if (!pagination) return 1;
    return pagination.totalPages || Math.ceil(pagination.totalItems / pagination.itemsPerPage);
  }

  getStartItem(): number {
    const pagination = this.pagination();
    if (!pagination) return 1;
    return (pagination.currentPage - 1) * pagination.itemsPerPage + 1;
  }

  getEndItem(): number {
    const pagination = this.pagination();
    if (!pagination) return this.data().length;
    const end = pagination.currentPage * pagination.itemsPerPage;
    return Math.min(end, pagination.totalItems);
  }
}
