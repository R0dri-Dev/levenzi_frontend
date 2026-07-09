import { Component, computed, inject, signal } from '@angular/core';

import { Compania } from '../../../../core/models/compania.model';
import { CompaniaService } from '../../../../core/services/compania/compania.service';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDataTableComponent } from '../../../../shared/ui/organisms/data-table/data-table';
import { LvModalComponent } from '../../../../shared/ui/organisms/modal/modal';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import { LvSearchBoxComponent } from '../../../../shared/ui/molecules/search-box/search-box';
import type { TableAction, TableColumn } from '../../../../shared/interfaces/table.interface';
import { CreateCompania } from '../create/create';
import { EditCompania } from '../edit/edit';
import { DetailCompania } from '../detail/detail';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [LvPageHeaderComponent, LvButtonComponent, LvDataTableComponent, LvModalComponent, LvSearchBoxComponent, CreateCompania, EditCompania, DetailCompania],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {
  private readonly service = inject(CompaniaService);

  readonly companias = signal<Compania[]>([]);
  readonly total = signal(0);
  readonly loading = signal(true);
  readonly searchTerm = signal('');
  readonly activeView = signal<'list' | 'create' | 'edit' | 'detail'>('list');
  readonly selectedCompania = signal<Compania | null>(null);

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
    this.selectedCompania.set(null);
    this.activeView.set('create');
  }

  verDetalle(compania: Compania): void {
    this.selectedCompania.set(compania);
    this.activeView.set('detail');
  }

  editarCompania(compania: Compania): void {
    this.selectedCompania.set(compania);
    this.activeView.set('edit');
  }

  closeForm(): void {
    this.selectedCompania.set(null);
    this.activeView.set('list');
  }

  handleCreateSubmit(payload: Partial<Compania>): void {
    this.service.create(payload).subscribe({
      next: (created) => {
        this.companias.update((items) => [created, ...items]);
        this.total.set(this.total() + 1);
        this.closeForm();
      },
      error: () => this.closeForm(),
    });
  }

  handleEditSubmit(payload: Partial<Compania>): void {
    const compania = this.selectedCompania();
    if (!compania?.id) {
      this.closeForm();
      return;
    }

    this.service.update(compania.id, payload).subscribe({
      next: (updated) => {
        this.companias.update((items) => items.map((item) => (item.id === compania.id ? { ...item, ...updated } : item)));
        this.closeForm();
      },
      error: () => this.closeForm(),
    });
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
