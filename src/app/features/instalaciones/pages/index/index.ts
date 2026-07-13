import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { Instalacion } from '../../../../core/models/instalacion.model';
import { InstalacionService } from '../../../../core/services/instalaciones/instalacion.service';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDataTableComponent } from '../../../../shared/ui/organisms/data-table/data-table';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import { LvSearchBoxComponent } from '../../../../shared/ui/molecules/search-box/search-box';
import type { TableAction, TableColumn } from '../../../../shared/interfaces/table.interface';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [LvPageHeaderComponent, LvButtonComponent, LvDataTableComponent, LvSearchBoxComponent],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {
  private readonly service = inject(InstalacionService);
  private readonly router = inject(Router);

  readonly instalaciones = signal<Instalacion[]>([]);
  readonly total = signal(0);
  readonly loading = signal(true);
  readonly searchTerm = signal('');

  readonly columns: TableColumn<Instalacion>[] = [
    { key: 'id', label: 'ID', width: '88px', sortable: true, render: (item) => `#${item.id}` },
    { key: 'nombre', label: 'Nombre', sortable: true, render: (item) => item.nombre },
    { key: 'tipo', label: 'Tipo', sortable: true, render: (item) => item.tipo ?? '-' },
    { key: 'activo', label: 'Estado', sortable: true, render: (item) => (item.activo ? 'Activo' : 'Inactivo') },
  ];

  readonly tableActions: TableAction<Instalacion>[] = [
    { label: 'Ver detalle', action: (item) => this.verDetalle(item), variant: 'secondary' },
    { label: 'Editar', action: (item) => this.editarInstalacion(item), variant: 'primary' },
    { label: 'Eliminar', action: (item) => this.eliminarInstalacion(item), variant: 'danger' },
  ];

  readonly filteredInstalaciones = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return this.instalaciones();

    return this.instalaciones().filter((instalacion) =>
      [
        instalacion.nombre,
        instalacion.tipo ?? '',
        instalacion.sede_id.toString(),
        instalacion.activo ? 'activo' : 'inactivo',
      ].some((field) => field.toLowerCase().includes(term))
    );
  });

  constructor() {
    this.load();
  }

  breadcrumb = signal([{ label: 'Inicio', route: '/' }, { label: 'Instalaciones' }]);

  load(page = 1): void {
    this.loading.set(true);
    this.service.list(page).subscribe({
      next: (response) => {
        this.instalaciones.set(response.data);
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
    void this.router.navigateByUrl('/instalaciones/create');
  }

  verDetalle(instalacion: Instalacion): void {
    void this.router.navigateByUrl(`/instalaciones/${instalacion.id}`);
  }

  editarInstalacion(instalacion: Instalacion): void {
    void this.router.navigateByUrl(`/instalaciones/${instalacion.id}/edit`);
  }

  eliminarInstalacion(instalacion: Instalacion): void {
    this.service.delete(instalacion.id!).subscribe({
      next: () => {
        this.instalaciones.update((items) => items.filter((item) => item.id !== instalacion.id));
        this.total.set(Math.max(this.total() - 1, 0));
      },
    });
  }
}

