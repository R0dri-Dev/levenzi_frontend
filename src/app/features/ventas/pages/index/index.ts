import { Component, computed, inject, signal } from '@angular/core';

import { Venta } from '../../../../core/models/venta.model';
import { VentaService } from '../../../../core/services/ventas/venta.service';
import { LvDataTableComponent } from '../../../../shared/ui/organisms/data-table/data-table';
import { LvModalComponent } from '../../../../shared/ui/organisms/modal/modal';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import { LvSearchBoxComponent } from '../../../../shared/ui/molecules/search-box/search-box';
import type { TableAction, TableColumn } from '../../../../shared/interfaces/table.interface';
import { DetailVenta } from '../detail/detail';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [LvPageHeaderComponent, LvDataTableComponent, LvModalComponent, LvSearchBoxComponent, DetailVenta],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {
  private readonly service = inject(VentaService);

  readonly ventas = signal<Venta[]>([]);
  readonly total = signal(0);
  readonly loading = signal(true);
  readonly searchTerm = signal('');
  readonly activeView = signal<'list' | 'detail'>('list');
  readonly selectedVenta = signal<Venta | null>(null);

  readonly columns: TableColumn<Venta>[] = [
    { key: 'id', label: 'ID', width: '88px', sortable: true, render: (item) => `#${item.id}` },
    { key: 'sede_id', label: 'Sede', sortable: true, render: (item) => `Sede ${item.sede_id}` },
    { key: 'cliente_id', label: 'Cliente', sortable: true, render: (item) => `Cliente ${item.cliente_id}` },
    { key: 'doctor_id', label: 'Doctor', sortable: true, render: (item) => `Doctor ${item.doctor_id}` },
  ];

  readonly tableActions: TableAction<Venta>[] = [
    { label: 'Ver detalle', action: (item) => this.verDetalle(item), variant: 'secondary' },
  ];

  readonly filteredVentas = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return this.ventas();

    return this.ventas().filter((venta) => [venta.direccion ?? '', venta.referencia ?? '', venta.observaciones ?? '', venta.sede_id.toString(), venta.cliente_id.toString(), venta.doctor_id.toString()].some((field) => field.toLowerCase().includes(term)));
  });

  constructor() {
    this.load();
  }

  breadcrumb = signal([{ label: 'Inicio', route: '/' }, { label: 'Ventas' }]);

  load(page = 1): void {
    this.loading.set(true);
    this.service.list(page).subscribe({
      next: (response) => {
        this.ventas.set(response.data);
        this.total.set(response.total);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  onSearch(value: string): void {
    this.searchTerm.set(value);
  }

  clearSearch(): void {
    this.searchTerm.set('');
  }

  verDetalle(venta: Venta): void {
    this.selectedVenta.set(venta);
    this.activeView.set('detail');
  }

  closeForm(): void {
    this.selectedVenta.set(null);
    this.activeView.set('list');
  }
}
