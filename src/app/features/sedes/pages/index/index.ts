import { Component, computed, inject, signal } from '@angular/core';
import { Sede } from '../../../../core/models/sede.model';
import { SedeService } from '../../../../core/services/sede/sede.service';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDataTableComponent } from '../../../../shared/ui/organisms/data-table/data-table';
import { LvModalComponent } from '../../../../shared/ui/organisms/modal/modal';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import { LvSearchBoxComponent } from '../../../../shared/ui/molecules/search-box/search-box';
import type { TableAction, TableColumn } from '../../../../shared/interfaces/table.interface';
import { CreateSede } from '../create/create';
import { EditSede } from '../edit/edit';
import { DetailSede } from '../detail/detail';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [LvPageHeaderComponent, LvButtonComponent, LvDataTableComponent, LvModalComponent, LvSearchBoxComponent, CreateSede, EditSede, DetailSede],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {
  private readonly service = inject(SedeService);

  readonly sedes = signal<Sede[]>([]);
  readonly total = signal(0);
  readonly loading = signal(true);
  readonly searchTerm = signal('');
  readonly activeView = signal<'list' | 'create' | 'edit' | 'detail'>('list');
  readonly selectedSede = signal<Sede | null>(null);

  readonly columns: TableColumn<Sede>[] = [
    { key: 'id', label: 'ID', width: '88px', sortable: true, render: (item) => `#${item.id}` },
    { key: 'nombre', label: 'Nombre', sortable: true, render: (item) => item.nombre },
    { key: 'codigo', label: 'Código', sortable: true, render: (item) => item.codigo },
    { key: 'activo', label: 'Estado', sortable: true, render: (item) => (item.activo ? 'Activo' : 'Inactivo') },
  ];

  readonly tableActions: TableAction<Sede>[] = [
    { label: 'Ver detalle', action: (item) => this.verDetalle(item), variant: 'secondary' },
    { label: 'Editar', action: (item) => this.editarSede(item), variant: 'primary' },
    { label: 'Eliminar', action: (item) => this.eliminarSede(item), variant: 'danger' },
  ];

  readonly filteredSedes = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return this.sedes();

    return this.sedes().filter((sede) => [sede.nombre, sede.codigo, sede.direccion, sede.activo ? 'activo' : 'inactivo'].some((field) => field.toLowerCase().includes(term)));
  });

  constructor() { this.load(); }

  breadcrumb = signal([{ label: 'Inicio', route: '/' }, { label: 'Sedes' }]);

  load(page = 1): void {
    this.loading.set(true);
    this.service.list(page).subscribe({
      next: (response) => {
        this.sedes.set(response.data);
        this.total.set(response.total);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  onSearch(value: string): void { this.searchTerm.set(value); }
  clearSearch(): void { this.searchTerm.set(''); }

  openCreateForm(): void { this.selectedSede.set(null); this.activeView.set('create'); }
  verDetalle(sede: Sede): void { this.selectedSede.set(sede); this.activeView.set('detail'); }
  editarSede(sede: Sede): void { this.selectedSede.set(sede); this.activeView.set('edit'); }
  closeForm(): void { this.selectedSede.set(null); this.activeView.set('list'); }

  handleCreateSubmit(payload: Partial<Sede>): void {
    this.service.create(payload).subscribe({
      next: (created) => {
        this.sedes.update((items) => [created, ...items]);
        this.total.set(this.total() + 1);
        this.closeForm();
      },
      error: () => this.closeForm(),
    });
  }

  handleEditSubmit(payload: Partial<Sede>): void {
    const sede = this.selectedSede();
    if (!sede?.id) { this.closeForm(); return; }

    this.service.update(sede.id, payload).subscribe({
      next: (updated) => {
        this.sedes.update((items) => items.map((item) => (item.id === sede.id ? { ...item, ...updated } : item)));
        this.closeForm();
      },
      error: () => this.closeForm(),
    });
  }

  eliminarSede(sede: Sede): void {
    this.service.delete(sede.id).subscribe({
      next: () => {
        this.sedes.update((items) => items.filter((item) => item.id !== sede.id));
        this.total.set(Math.max(this.total() - 1, 0));
      },
    });
  }
}
