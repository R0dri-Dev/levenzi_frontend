import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { Compania } from '../../../../core/models/compania.model';
import { CompaniaService } from '../../../../core/services/compania/compania.service';
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
  private readonly router = inject(Router);
  private readonly service = inject(CompaniaService);

  readonly companias = signal<Compania[]>([]);
  readonly total = signal(0);
  readonly loading = signal(true);
  readonly searchTerm = signal('');

  readonly columns: TableColumn<Compania>[] = [
    { key: 'id', label: 'ID', width: '88px', sortable: true, render: (item) => `#${item.id}` },
    { key: 'nombre', label: 'Nombre', sortable: true, render: (item) => item.nombre },
    { key: 'ruc', label: 'RUC', sortable: true, render: (item) => item.ruc },
    { key: 'activo', label: 'Estado', sortable: true, render: (item) => (item.activo ? 'Activo' : 'Inactivo') },
  ];

  readonly tableActions: TableAction<Compania>[] = [
    { label: 'Ver detalle', action: (item) => this.verDetalle(item), variant: 'secondary' },
    { label: 'Editar', action: (item) => this.editarCompania(item), variant: 'primary' },
    { label: 'Eliminar', action: (item) => this.eliminarCompania(item), variant: 'danger' },
  ];

  readonly filteredCompanias = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return this.companias();

    return this.companias().filter((compania) => [compania.nombre, compania.ruc, compania.direccion, compania.activo ? 'activo' : 'inactivo'].some((field) => field.toLowerCase().includes(term)));
  });

  constructor() {
    this.load();
  }

  breadcrumb = signal([{ label: 'Inicio', route: '/' }, { label: 'Compañías' }]);

  load(page = 1): void {
    this.loading.set(true);
    this.service.list(page).subscribe({
      next: (response) => {
        this.companias.set(response.data);
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
    void this.router.navigateByUrl('/companias/create');
  }

  verDetalle(compania: Compania): void {
    void this.router.navigateByUrl(`/companias/${compania.id}`);
  }

  editarCompania(compania: Compania): void {
    void this.router.navigateByUrl(`/companias/${compania.id}/edit`);
  }

  eliminarCompania(compania: Compania): void {
    this.service.delete(compania.id).subscribe({
      next: () => {
        this.companias.update((items) => items.filter((item) => item.id !== compania.id));
        this.total.set(Math.max(this.total() - 1, 0));
      },
    });
  }
}
