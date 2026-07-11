import { Component, computed, inject, signal } from '@angular/core';

import { Cliente } from '../../../../core/models/cliente.model';
import { ClienteService } from '../../../../core/services/clientes/cliente.service';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDataTableComponent } from '../../../../shared/ui/organisms/data-table/data-table';
import { LvModalComponent } from '../../../../shared/ui/organisms/modal/modal';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import { LvSearchBoxComponent } from '../../../../shared/ui/molecules/search-box/search-box';
import type { TableAction, TableColumn } from '../../../../shared/interfaces/table.interface';
import { CreateCliente } from '../create/create';
import { EditCliente } from '../edit/edit';
import { DetailCliente } from '../detail/detail';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [LvPageHeaderComponent, LvButtonComponent, LvDataTableComponent, LvModalComponent, LvSearchBoxComponent, CreateCliente, EditCliente, DetailCliente],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {
  private readonly service = inject(ClienteService);

  readonly clientes = signal<Cliente[]>([]);
  readonly total = signal(0);
  readonly loading = signal(true);
  readonly searchTerm = signal('');
  readonly activeView = signal<'list' | 'create' | 'edit' | 'detail'>('list');
  readonly selectedCliente = signal<Cliente | null>(null);

  readonly columns: TableColumn<Cliente>[] = [
    { key: 'id', label: 'ID', width: '88px', sortable: true, render: (item) => `#${item.id}` },
    { key: 'nombre', label: 'Nombre', sortable: true, render: (item) => item.nombre },
    { key: 'documento_numero', label: 'Documento', sortable: true, render: (item) => item.documento_numero ?? '-' },
    { key: 'telefono', label: 'Teléfono', sortable: true, render: (item) => item.telefono ?? '-' },
    { key: 'activo', label: 'Estado', sortable: true, render: (item) => (item.activo ? 'Activo' : 'Inactivo') },
  ];

  readonly tableActions: TableAction<Cliente>[] = [
    { label: 'Ver detalle', action: (item) => this.verDetalle(item), variant: 'secondary' },
    { label: 'Editar', action: (item) => this.editarCliente(item), variant: 'primary' },
    { label: 'Eliminar', action: (item) => this.eliminarCliente(item), variant: 'danger' },
  ];

  readonly filteredClientes = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return this.clientes();

    return this.clientes().filter((cliente) => [cliente.nombre, cliente.documento_numero ?? '', cliente.telefono ?? '', cliente.email ?? '', cliente.activo ? 'activo' : 'inactivo'].some((field) => field.toLowerCase().includes(term)));
  });

  constructor() {
    this.load();
  }

  breadcrumb = signal([{ label: 'Inicio', route: '/' }, { label: 'Clientes' }]);

  load(page = 1): void {
    this.loading.set(true);
    this.service.list(page).subscribe({
      next: (response) => {
        this.clientes.set(response.data);
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
    this.selectedCliente.set(null);
    this.activeView.set('create');
  }

  verDetalle(cliente: Cliente): void {
    this.selectedCliente.set(cliente);
    this.activeView.set('detail');
  }

  editarCliente(cliente: Cliente): void {
    this.selectedCliente.set(cliente);
    this.activeView.set('edit');
  }

  closeForm(): void {
    this.selectedCliente.set(null);
    this.activeView.set('list');
  }

  handleCreateSubmit(payload: Partial<Cliente>): void {
    this.service.create(payload).subscribe({
      next: (created) => {
        this.clientes.update((items) => [created, ...items]);
        this.total.set(this.total() + 1);
        this.closeForm();
      },
      error: () => this.closeForm(),
    });
  }

  handleEditSubmit(payload: Partial<Cliente>): void {
    const cliente = this.selectedCliente();
    if (!cliente?.id) {
      this.closeForm();
      return;
    }

    this.service.update(cliente.id, payload).subscribe({
      next: (updated) => {
        this.clientes.update((items) => items.map((item) => (item.id === cliente.id ? { ...item, ...updated } : item)));
        this.closeForm();
      },
      error: () => this.closeForm(),
    });
  }

  eliminarCliente(cliente: Cliente): void {
    this.service.delete(cliente.id).subscribe({
      next: () => {
        this.clientes.update((items) => items.filter((item) => item.id !== cliente.id));
        this.total.set(Math.max(this.total() - 1, 0));
      },
    });
  }
}
