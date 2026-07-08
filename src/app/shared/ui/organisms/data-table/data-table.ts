import { Component, input, output, signal, computed, model } from '@angular/core';
import type { TableColumn, TableAction, TablePagination, TableSort } from '../../../interfaces/table.interface';
import { LvHeadingComponent, LvParagraphComponent, LvButtonComponent } from "../../atoms";
import { LvIconComponent } from "../../icons/icon/icon";
import { LvDataFilterComponent } from "../data-filter/data-filter";
import { LvTableComponent } from "../../molecules";

@Component({
  selector: 'lv-data-table',
  standalone: true,
  imports: [
    LvHeadingComponent,
    LvParagraphComponent,
    LvButtonComponent,
    LvIconComponent,
    LvDataFilterComponent,
    LvTableComponent
],
  templateUrl: './data-table.html',
  styleUrls: ['./data-table.css'],
})
export class LvDataTableComponent<T = unknown> {
  readonly title = input<string>('');
  readonly description = input<string>('');
  readonly data = input.required<T[]>();
  readonly columns = input.required<TableColumn<T>[]>();
  readonly loading = input(false);
  readonly emptyMessage = input<string>('No hay datos disponibles');
  readonly actions = input<TableAction<T>[]>([]);
  readonly selectable = input(false);
  readonly pagination = input<TablePagination>();
  readonly sort = model<TableSort | null>(null);
  readonly showFilter = input(true);
  readonly showActions = input(true);

  readonly onRowClick = output<T>();
  readonly onSort = output<TableSort>();
  readonly onPageChange = output<number>();
  readonly onSelectionChange = output<T[]>();
  readonly onAdd = output<void>();
  readonly onExport = output<void>();
  readonly onRefresh = output<void>();

  readonly hasFilters = signal(false);

  toggleFilters(): void {
    this.hasFilters.update(v => !v);
  }

  handleAdd(): void {
    this.onAdd.emit();
  }

  handleExport(): void {
    this.onExport.emit();
  }

  handleRefresh(): void {
    this.onRefresh.emit();
  }
}
