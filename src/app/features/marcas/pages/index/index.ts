import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { Marca } from '../../../../core/models/marca.model';
import { MarcaService } from '../../../../core/services/marcas/marca.service';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDataTableComponent } from '../../../../shared/ui/organisms/data-table/data-table';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import type { TableAction, TableColumn } from '../../../../shared/interfaces/table.interface';
import { LvYesNoPipe, LvEmptyPipe } from '../../../../shared/pipes';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [LvPageHeaderComponent, LvButtonComponent, LvDataTableComponent],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {
  private readonly service = inject(MarcaService);
  private readonly router = inject(Router);
  private readonly yesNoPipe = new LvYesNoPipe();
  private readonly emptyPipe = new LvEmptyPipe();

  readonly marcas = signal<Marca[]>([]);
  readonly total = signal(0);
  readonly loading = signal(true);
  readonly searchTerm = signal('');

  readonly columns: TableColumn<Marca>[] = [
    { key: 'id', label: 'ID', width: '88px', sortable: true, render: (item) => `#${item.id}` },
    { key: 'nombre', label: 'Nombre', sortable: true, render: (item) => item.nombre },
    { key: 'codigo', render: (item) => this.emptyPipe.transform(item.codigo) as string, label: 'Código', sortable: true },
    { key: 'descripcion', render: (item) => this.emptyPipe.transform(item.descripcion) as string, label: 'Descripción', sortable: true },
    { key: 'activo', render: (item) => this.yesNoPipe.transform(item.activo, 'Activo', 'Inactivo'), label: 'Estado', sortable: true },
  ];

  readonly tableActions: TableAction<Marca>[] = [
    { label: 'Ver detalle', action: (item) => this.verDetalle(item), variant: 'secondary' },
    { label: 'Editar', action: (item) => this.editarMarca(item), variant: 'primary' },
    { label: 'Eliminar', action: (item) => this.eliminarMarca(item), variant: 'danger' },
  ];

  readonly filteredMarcas = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return this.marcas();

    return this.marcas().filter((marca) =>
      [
        marca.nombre,
        marca.codigo ?? '',
        marca.descripcion ?? '',
        marca.activo ? 'activo' : 'inactivo',
      ].some((field) => field.toLowerCase().includes(term))
    );
  });

  constructor() {
    this.load();
  }

  breadcrumb = signal([{ label: 'Inicio', route: '/' }, { label: 'Marcas' }]);

  load(page = 1): void {
    this.loading.set(true);
    this.service.list(page).subscribe({
      next: (response) => {
        this.marcas.set(response.data);
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
    this.router.navigate(['/marcas/create']);
  }

  verDetalle(marca: Marca): void {
    this.router.navigate(['/marcas', marca.id]);
  }

  editarMarca(marca: Marca): void {
    this.router.navigate(['/marcas', marca.id, 'edit']);
  }

  eliminarMarca(marca: Marca): void {
    this.service.delete(marca.id).subscribe({
      next: () => {
        this.marcas.update((items) => items.filter((item) => item.id !== marca.id));
        this.total.set(Math.max(this.total() - 1, 0));
      },
    });
  }
}

