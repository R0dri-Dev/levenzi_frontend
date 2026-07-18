import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { UnidadMedida } from '../../../../core/models/unidad-medida.model';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDataTableComponent } from '../../../../shared/ui/organisms/data-table/data-table';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import { LvSearchBoxComponent } from '../../../../shared/ui/molecules/search-box/search-box';
import type { TableAction, TableColumn } from '../../../../shared/interfaces/table.interface';
import { UnidadMedidaService } from '../../../../core/services/unidades-medida/unidades-medida.service';
import { formatDecimal } from '../../../../shared/utils/format-number.util';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [LvPageHeaderComponent, LvButtonComponent, LvDataTableComponent],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {
  private readonly service = inject(UnidadMedidaService);
  private readonly router = inject(Router);

  readonly unidades = signal<UnidadMedida[]>([]);
  readonly total = signal(0);
  readonly loading = signal(true);
  readonly searchTerm = signal('');

  readonly columns: TableColumn<UnidadMedida>[] = [
    { key: 'id', label: 'ID', width: '88px', sortable: true, render: (item) => `#${item.id}` },
    { key: 'nombre', label: 'Nombre', sortable: true, render: (item) => item.nombre },
    { key: 'simbolo', label: 'Símbolo', sortable: true, render: (item) => item.simbolo },
    {
      key: 'factor_base',
      label: 'Factor base',
      sortable: true,
      render: (item) => formatDecimal(item.factor_base),
    },
    { key: 'base', label: 'Es base', sortable: true, render: (item) => (item.base ? 'Sí' : 'No') },
    {
      key: 'conversion',
      label: 'Convertible',
      sortable: true,
      render: (item) => (item.conversion ? 'Sí' : 'No'),
    },
    {
      key: 'activo',
      label: 'Estado',
      sortable: true,
      render: (item) => (item.activo ? 'Activo' : 'Inactivo'),
    },
  ];

  readonly tableActions: TableAction<UnidadMedida>[] = [
    { label: 'Ver detalle', action: (item) => this.verDetalle(item), variant: 'secondary' },
    { label: 'Editar', action: (item) => this.editar(item), variant: 'primary' },
    { label: 'Eliminar', action: (item) => this.eliminar(item), variant: 'danger' },
  ];

  readonly filteredUnidades = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return this.unidades();

    return this.unidades().filter((unidad) =>
      [unidad.nombre, unidad.simbolo].some((field) =>
        field.toString().toLowerCase().includes(term),
      ),
    );
  });

  breadcrumb = signal([{ label: 'Inicio', route: '/' }, { label: 'Unidades de medida' }]);

  constructor() {
    this.load();
  }

  load(page = 1): void {
    this.loading.set(true);
    this.service.list(page).subscribe({
      next: (response) => {
        this.unidades.set(response.data);
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
    this.router.navigate(['/unidades-medida/create']);
  }

  verDetalle(unidad: UnidadMedida): void {
    this.router.navigate(['/unidades-medida', unidad.id]);
  }

  editar(unidad: UnidadMedida): void {
    this.router.navigate(['/unidades-medida', unidad.id, 'edit']);
  }

  eliminar(unidad: UnidadMedida): void {
    this.service.delete(unidad.id).subscribe({
      next: () => {
        this.unidades.update((items) => items.filter((item) => item.id !== unidad.id));
        this.total.set(Math.max(this.total() - 1, 0));
      },
    });
  }
}
