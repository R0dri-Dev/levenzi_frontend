import { Component, input, output, signal, effect, model, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvButtonComponent } from '../../atoms/button/button';
import { LvBadgeComponent } from '../../atoms/badge/badge';
import { LvCheckboxComponent } from '../../atoms/checkbox/checkbox';
import { LvIconComponent } from '../../icons/icon/icon';
import { LvIconButtonComponent } from '../../atoms/icon-button/icon-button';
import { LvParagraphComponent } from '../../atoms/paragraph/paragraph';
import { LvSpinnerComponent } from '../../atoms/spinner/spinner';
import { LvEmptyStateComponent } from '../empty-state/empty-state';
import { LvColorVariant, LvSize } from '../../../types';
import type { TableColumn, TableAction, TablePagination, TableSort } from '../../../interfaces/table.interface';

interface TableBadgeContent {
  type: 'badge';
  text: string;
  variant?: LvColorVariant;
}

@Component({
  selector: 'lv-table',
  standalone: true,
  imports: [
    CommonModule,
    LvIconComponent,
    LvButtonComponent,
    LvBadgeComponent,
    LvCheckboxComponent,
    LvParagraphComponent,
    LvSpinnerComponent,
    LvEmptyStateComponent,
    LvIconButtonComponent
  ],
  templateUrl: './table.html',
  styleUrls: ['./table.css'],
})
export class LvTableComponent<T = unknown> {
  readonly data = input.required<T[]>();
  readonly columns = input.required<TableColumn<T>[]>();
  readonly size = input<LvSize>('md');
  readonly loading = input(false);
  readonly emptyMessage = input<string>('No hay datos disponibles');
  readonly actions = input<TableAction<T>[]>([]);
  readonly selectable = input(false);
  readonly pagination = input<TablePagination>();
  readonly sort = model<TableSort | null>(null);

  readonly onRowClick = output<T>();
  readonly onSort = output<TableSort>();
  readonly onPageChange = output<number>();
  readonly onSelectionChange = output<T[]>();

  selectedItems = signal<T[]>([]);
  selectAll = signal(false);

  readonly visibleColumns = computed(() => {
    return this.columns().filter(col => !col.hidden);
  });

  readonly hasActions = computed(() => {
    return this.actions().length > 0;
  });

  readonly totalItems = computed(() => {
    return this.pagination()?.totalItems || this.data().length;
  });

  constructor() {
    effect(() => {
      if (this.selectable()) {
        this.selectedItems.set([]);
        this.selectAll.set(false);
      }
    });
  }

  getCellValue(item: T, column: TableColumn<T>): unknown {
    const value = (item as any)[column.key];
    return column.render ? column.render(item) : value;
  }

  isBadgeContent(value: unknown): value is TableBadgeContent {
    return typeof value === 'object' && value !== null && 'type' in value && (value as { type?: unknown }).type === 'badge';
  }

  getBadgeText(value: unknown): string {
    return this.isBadgeContent(value) ? value.text : '';
  }

  getBadgeVariant(value: unknown): LvColorVariant {
    return this.isBadgeContent(value) && value.variant ? value.variant : 'primary';
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
