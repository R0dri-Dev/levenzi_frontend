import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { Modulo } from '../../../../core/models/modulo.model';
import { ModuloService } from '../../../../core/services/modulos/modulo.service';
import { LvDataTableComponent } from '../../../../shared/ui/organisms/data-table/data-table';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import { LvSearchBoxComponent } from '../../../../shared/ui/molecules/search-box/search-box';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';

import type { TableAction, TableColumn } from '../../../../shared/interfaces/table.interface';

import type { BreadcrumbItem } from '../../../../shared/interfaces/breadcrumb.interface';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [LvPageHeaderComponent, LvDataTableComponent, LvSearchBoxComponent, LvButtonComponent],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {
  private readonly service = inject(ModuloService);
  private readonly router = inject(Router);

  readonly modulos = signal<Modulo[]>([]);
  readonly total = signal(0);
  readonly loading = signal(true);
  readonly searchTerm = signal('');

  readonly breadcrumb = signal<BreadcrumbItem[]>([
    { label: 'Inicio', path: '/' },
    { label: 'Módulos' },
  ]);

  readonly columns: TableColumn<Modulo>[] = [
    { key: 'id', label: 'ID', width: '88px', sortable: true, render: (item) => `#${item.id}` },
    { key: 'nombre', label: 'Nombre', sortable: true, render: (item) => item.nombre },
    { key: 'codigo', label: 'Código', sortable: true, render: (item) => item.codigo ?? '-' },
    { key: 'descripcion', label: 'Descripción', sortable: true, render: (item) => item.descripcion ?? '-' },
  ];

  readonly tableActions: TableAction<Modulo>[] = [
    { label: 'Ver detalle', action: (item) => this.verDetalle(item), variant: 'secondary' },
    { label: 'Editar', action: (item) => this.editarModulo(item), variant: 'primary' },
  ];

  readonly filteredModulos = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return this.modulos();

    return this.modulos().filter((modulo) =>
      [modulo.nombre, modulo.codigo ?? '', modulo.descripcion ?? ''].some((field) => field.toLowerCase().includes(term))
    );
  });

  constructor() {
    this.load();
  }

  private load(page = 1): void {
    this.loading.set(true);

    this.service.list(page).subscribe({
      next: (response) => {
        this.modulos.set(response.data);
        this.total.set(response.total);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  onSearch(value: string): void {
    this.searchTerm.set(value);
  }

  clearSearch(): void {
    this.searchTerm.set('');
  }

  openCreateForm(): void {
    void this.router.navigate(['/modulos/create']);
  }

  verDetalle(modulo: Modulo): void {
    void this.router.navigate(['/modulos', modulo.id]);
  }

  editarModulo(modulo: Modulo): void {
    void this.router.navigate(['/modulos', modulo.id, 'edit']);
  }
}

