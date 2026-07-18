import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { TipoUnidadMedida } from '../../../../core/models/tipo-unidad-medida.model';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDataTableComponent } from '../../../../shared/ui/organisms/data-table/data-table';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import type { TableAction, TableColumn } from '../../../../shared/interfaces/table.interface';
import { TipoUnidadMedidaService } from '../../../../core/services/tipos-unidad-medida/tipos-unidad-medida.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [LvPageHeaderComponent, LvButtonComponent, LvDataTableComponent],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {
  private readonly service = inject(TipoUnidadMedidaService);
  private readonly router = inject(Router);

  readonly tipos = signal<TipoUnidadMedida[]>([]);
  readonly total = signal(0);
  readonly loading = signal(true);
  readonly searchTerm = signal('');

  readonly columns: TableColumn<TipoUnidadMedida>[] = [
    { key: 'id', label: 'ID', width: '88px', sortable: true, render: (item) => `#${item.id}` },
    { key: 'nombre', label: 'Nombre', sortable: true, render: (item) => item.nombre },
    {
      key: 'descripcion',
      label: 'Descripción',
      sortable: false,
      render: (item) => item.descripcion || '—',
    },
  ];

  readonly tableActions: TableAction<TipoUnidadMedida>[] = [
    { label: 'Ver detalle', action: (item) => this.verDetalle(item), variant: 'secondary' },
    { label: 'Editar', action: (item) => this.editar(item), variant: 'primary' },
    { label: 'Eliminar', action: (item) => this.eliminar(item), variant: 'danger' },
  ];

  readonly filteredTipos = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return this.tipos();

    return this.tipos().filter((tipo) =>
      [tipo.nombre, tipo.descripcion ?? ''].some((field) =>
        field.toString().toLowerCase().includes(term),
      ),
    );
  });

  breadcrumb = signal([{ label: 'Inicio', route: '/' }, { label: 'Tipos de unidad de medida' }]);

  constructor() {
    this.load();
  }

  load(page = 1): void {
    this.loading.set(true);
    this.service.list(page).subscribe({
      next: (response) => {
        this.tipos.set(response.data);
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
    this.router.navigate(['/tipos-unidad-medida/create']);
  }

  verDetalle(tipo: TipoUnidadMedida): void {
    this.router.navigate(['/tipos-unidad-medida', tipo.id]);
  }

  editar(tipo: TipoUnidadMedida): void {
    this.router.navigate(['/tipos-unidad-medida', tipo.id, 'edit']);
  }

  eliminar(tipo: TipoUnidadMedida): void {
    this.service.delete(tipo.id).subscribe({
      next: () => {
        this.tipos.update((items) => items.filter((item) => item.id !== tipo.id));
        this.total.set(Math.max(this.total() - 1, 0));
      },
    });
  }
}
