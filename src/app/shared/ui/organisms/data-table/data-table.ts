import { Component, input, output, model } from '@angular/core';
import type { TableColumn, TableAction, TablePagination, TableSort } from '../../../interfaces/table.interface';
import { LvHeadingComponent, LvParagraphComponent } from '../../atoms';
import { LvTableComponent } from '../../molecules';

@Component({
  selector: 'lv-data-table',
  standalone: true,
  imports: [
    LvHeadingComponent,
    LvParagraphComponent,
    LvTableComponent,
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
  readonly showFilter = input(false);
  readonly showActions = input(false);

  readonly onRowClick = output<T>();
  readonly onSort = output<TableSort>();
  readonly onPageChange = output<number>();
  readonly onSelectionChange = output<T[]>();
}
