import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { ProductoConversion } from '../../../../core/models/producto-conversion.model';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDataTableComponent } from '../../../../shared/ui/organisms/data-table/data-table';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import { LvSearchBoxComponent } from '../../../../shared/ui/molecules/search-box/search-box';
import type { TableAction, TableColumn } from '../../../../shared/interfaces/table.interface';
import {
  ProductoConversionService
} from '../../../../core/services/producto-conversiones/producto-conversiones.service';
import { LvDecimalPipe, LvYesNoPipe } from '../../../../shared/pipes';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [LvPageHeaderComponent, LvButtonComponent, LvDataTableComponent, LvSearchBoxComponent],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {
  private readonly service = inject(ProductoConversionService);
  private readonly router = inject(Router);
  private readonly decimalPipe = new LvDecimalPipe();
  private readonly yesNoPipe = new LvYesNoPipe();

  readonly conversiones = signal<ProductoConversion[]>([]);
  readonly total = signal(0);
  readonly loading = signal(true);
  readonly searchTerm = signal('');

  readonly columns: TableColumn<ProductoConversion>[] = [
    { key: 'id', label: 'ID', width: '88px', sortable: true, render: (item) => `#${item.id}` },
    {
      key: 'producto_id',
      label: 'Producto',
      sortable: true,
      render: (item) => `#${item.producto_id}`,
    },
    {
      key: 'unidad_medida_origen_id',
      label: 'Unidad origen',
      sortable: true,
      render: (item) => `#${item.unidad_medida_origen_id}`,
    },
    {
      key: 'unidad_medida_destino_id',
      label: 'Unidad destino',
      sortable: true,
      render: (item) => `#${item.unidad_medida_destino_id}`,
    },
    {
      key: 'factor_conversion',
      label: 'Factor',
      sortable: true,
      render: (item) => this.decimalPipe.transform(item.factor_conversion),
    },
    {
      key: 'activo',
      label: 'Estado',
      sortable: true,
      render: (item) => this.yesNoPipe.transform(item.activo, 'Activo', 'Inactivo'),
    },
  ];

  readonly tableActions: TableAction<ProductoConversion>[] = [
    { label: 'Ver detalle', action: (item) => this.verDetalle(item), variant: 'secondary' },
    { label: 'Editar', action: (item) => this.editar(item), variant: 'primary' },
    { label: 'Eliminar', action: (item) => this.eliminar(item), variant: 'danger' },
  ];

  readonly filteredConversiones = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return this.conversiones();

    return this.conversiones().filter((c) =>
      [c.producto_id, c.unidad_medida_origen_id, c.unidad_medida_destino_id].some((field) =>
        field.toString().toLowerCase().includes(term),
      ),
    );
  });

  breadcrumb = signal([{ label: 'Inicio', route: '/' }, { label: 'Conversiones de producto' }]);

  constructor() {
    this.load();
  }

  load(page = 1): void {
    this.loading.set(true);
    this.service.list(page).subscribe({
      next: (response) => {
        this.conversiones.set(response.data);
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

  openCreateForm(): void {
    this.router.navigate(['/producto-conversiones/create']);
  }

  verDetalle(item: ProductoConversion): void {
    this.router.navigate(['/producto-conversiones', item.id]);
  }

  editar(item: ProductoConversion): void {
    this.router.navigate(['/producto-conversiones', item.id, 'edit']);
  }

  eliminar(item: ProductoConversion): void {
    this.service.delete(item.id).subscribe({
      next: () => {
        this.conversiones.update((items) => items.filter((i) => i.id !== item.id));
        this.total.set(Math.max(this.total() - 1, 0));
      },
    });
  }
}
