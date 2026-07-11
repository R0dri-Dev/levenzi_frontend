import { Component, computed, inject, signal } from '@angular/core';

import { Instalacion } from '../../../../core/models/instalacion.model';
import { InstalacionService } from '../../../../core/services/instalaciones/instalacion.service';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDataTableComponent } from '../../../../shared/ui/organisms/data-table/data-table';
import { LvModalComponent } from '../../../../shared/ui/organisms/modal/modal';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import { LvSearchBoxComponent } from '../../../../shared/ui/molecules/search-box/search-box';
import type { TableAction, TableColumn } from '../../../../shared/interfaces/table.interface';
import { CreateInstalacion } from '../create/create';
import { EditInstalacion } from '../edit/edit';
import { DetailInstalacion } from '../detail/detail';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [LvPageHeaderComponent, LvButtonComponent, LvDataTableComponent, LvModalComponent, LvSearchBoxComponent, CreateInstalacion, EditInstalacion, DetailInstalacion],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {
  private readonly service = inject(InstalacionService);

  readonly instalaciones = signal<Instalacion[]>([]);
  readonly total = signal(0);
  readonly loading = signal(true);
  readonly searchTerm = signal('');
  readonly activeView = signal<'list' | 'create' | 'edit' | 'detail'>('list');
  readonly selectedInstalacion = signal<Instalacion | null>(null);

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

    return this.instalaciones().filter((instalacion) => [instalacion.nombre, instalacion.tipo ?? '', instalacion.sede_id.toString(), instalacion.activo ? 'activo' : 'inactivo'].some((field) => field.toLowerCase().includes(term)));
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
    this.selectedInstalacion.set(null);
    this.activeView.set('create');
  }

  verDetalle(instalacion: Instalacion): void {
    this.selectedInstalacion.set(instalacion);
    this.activeView.set('detail');
  }

  editarInstalacion(instalacion: Instalacion): void {
    this.selectedInstalacion.set(instalacion);
    this.activeView.set('edit');
  }

  closeForm(): void {
    this.selectedInstalacion.set(null);
    this.activeView.set('list');
  }

  handleCreateSubmit(payload: Partial<Instalacion>): void {
    this.service.create(payload).subscribe({
      next: (created) => {
        this.instalaciones.update((items) => [created, ...items]);
        this.total.set(this.total() + 1);
        this.closeForm();
      },
      error: () => this.closeForm(),
    });
  }

  handleEditSubmit(payload: Partial<Instalacion>): void {
    const instalacion = this.selectedInstalacion();
    if (!instalacion?.id) {
      this.closeForm();
      return;
    }

    this.service.update(instalacion.id, payload).subscribe({
      next: (updated) => {
        this.instalaciones.update((items) => items.map((item) => (item.id === instalacion.id ? { ...item, ...updated } : item)));
        this.closeForm();
      },
      error: () => this.closeForm(),
    });
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
