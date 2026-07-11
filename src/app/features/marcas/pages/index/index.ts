import { Component, computed, inject, signal } from '@angular/core';

import { Marca } from '../../../../core/models/marca.model';
import { MarcaService } from '../../../../core/services/marcas/marca.service';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDataTableComponent } from '../../../../shared/ui/organisms/data-table/data-table';
import { LvModalComponent } from '../../../../shared/ui/organisms/modal/modal';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import { LvSearchBoxComponent } from '../../../../shared/ui/molecules/search-box/search-box';
import type { TableAction, TableColumn } from '../../../../shared/interfaces/table.interface';
import { CreateMarca } from '../create/create';
import { EditMarca } from '../edit/edit';
import { DetailMarca } from '../detail/detail';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [LvPageHeaderComponent, LvButtonComponent, LvDataTableComponent, LvModalComponent, LvSearchBoxComponent, CreateMarca, EditMarca, DetailMarca],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {
  private readonly service = inject(MarcaService);

  readonly marcas = signal<Marca[]>([]);
  readonly total = signal(0);
  readonly loading = signal(true);
  readonly searchTerm = signal('');
  readonly activeView = signal<'list' | 'create' | 'edit' | 'detail'>('list');
  readonly selectedMarca = signal<Marca | null>(null);

  readonly columns: TableColumn<Marca>[] = [
    { key: 'id', label: 'ID', width: '88px', sortable: true, render: (item) => `#${item.id}` },
    { key: 'nombre', label: 'Nombre', sortable: true, render: (item) => item.nombre },
    { key: 'codigo', label: 'Código', sortable: true, render: (item) => item.codigo ?? '-' },
    { key: 'descripcion', label: 'Descripción', sortable: true, render: (item) => item.descripcion ?? '-' },
    { key: 'activo', label: 'Estado', sortable: true, render: (item) => (item.activo ? 'Activo' : 'Inactivo') },
  ];

  readonly tableActions: TableAction<Marca>[] = [
    { label: 'Ver detalle', action: (item) => this.verDetalle(item), variant: 'secondary' },
    { label: 'Editar', action: (item) => this.editarMarca(item), variant: 'primary' },
    { label: 'Eliminar', action: (item) => this.eliminarMarca(item), variant: 'danger' },
  ];

  readonly filteredMarcas = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return this.marcas();

    return this.marcas().filter((marca) => [marca.nombre, marca.codigo ?? '', marca.descripcion ?? '', marca.activo ? 'activo' : 'inactivo'].some((field) => field.toLowerCase().includes(term)));
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
    this.selectedMarca.set(null);
    this.activeView.set('create');
  }

  verDetalle(marca: Marca): void {
    this.selectedMarca.set(marca);
    this.activeView.set('detail');
  }

  editarMarca(marca: Marca): void {
    this.selectedMarca.set(marca);
    this.activeView.set('edit');
  }

  closeForm(): void {
    this.selectedMarca.set(null);
    this.activeView.set('list');
  }

  handleCreateSubmit(payload: Partial<Marca>): void {
    this.service.create(payload).subscribe({
      next: (created) => {
        this.marcas.update((items) => [created, ...items]);
        this.total.set(this.total() + 1);
        this.closeForm();
      },
      error: () => this.closeForm(),
    });
  }

  handleEditSubmit(payload: Partial<Marca>): void {
    const marca = this.selectedMarca();
    if (!marca?.id) {
      this.closeForm();
      return;
    }

    this.service.update(marca.id, payload).subscribe({
      next: (updated) => {
        this.marcas.update((items) => items.map((item) => (item.id === marca.id ? { ...item, ...updated } : item)));
        this.closeForm();
      },
      error: () => this.closeForm(),
    });
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
