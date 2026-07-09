import { Component, computed, inject, signal } from '@angular/core';

import { User } from '../../../../core/models/user.model';
import { UserService } from '../../../../core/services/Usuarios/user.service';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDataTableComponent } from '../../../../shared/ui/organisms/data-table/data-table';
import { LvModalComponent } from '../../../../shared/ui/organisms/modal/modal';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import { LvSearchBoxComponent } from '../../../../shared/ui/molecules/search-box/search-box';
import type { TableAction, TableColumn } from '../../../../shared/interfaces/table.interface';
import { CreateUser } from '../create/create';
import { EditUser } from '../edit/edit';
import { DetailUser } from '../detail/detail';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [LvPageHeaderComponent, LvButtonComponent, LvDataTableComponent, LvModalComponent, LvSearchBoxComponent, CreateUser, EditUser, DetailUser],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {
  private readonly service = inject(UserService);

  readonly users = signal<User[]>([]);
  readonly total = signal(0);
  readonly loading = signal(true);
  readonly searchTerm = signal('');
  readonly activeView = signal<'list' | 'create' | 'edit' | 'detail'>('list');
  readonly selectedUser = signal<User | null>(null);

  readonly columns: TableColumn<User>[] = [
    { key: 'id', label: 'ID', width: '88px', sortable: true, render: (item) => `#${item.id}` },
    { key: 'name', label: 'Nombre', sortable: true, render: (item) => item.name },
    { key: 'email', label: 'Correo', sortable: true, render: (item) => item.email },
    { key: 'activo', label: 'Estado', sortable: true, render: (item) => (item.activo ? 'Activo' : 'Inactivo') },
  ];

  readonly tableActions: TableAction<User>[] = [
    { label: 'Ver detalle', action: (item) => this.verDetalle(item), variant: 'secondary' },
    { label: 'Editar', action: (item) => this.editarUsuario(item), variant: 'primary' },
    { label: 'Desactivar', action: (item) => this.eliminarUsuario(item), variant: 'danger' },
  ];

  readonly filteredUsers = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return this.users();

    return this.users().filter((user) => [user.name, user.email, user.activo ? 'activo' : 'inactivo'].some((field) => field.toLowerCase().includes(term)));
  });

  constructor() {
    this.load();
  }

  breadcrumb = signal([{ label: 'Inicio', route: '/' }, { label: 'Usuarios' }]);

  load(page = 1): void {
    this.loading.set(true);
    this.service.list(page).subscribe({
      next: (response) => {
        this.users.set(response.data);
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
    this.selectedUser.set(null);
    this.activeView.set('create');
  }

  verDetalle(usuario: User): void {
    this.selectedUser.set(usuario);
    this.activeView.set('detail');
  }

  editarUsuario(usuario: User): void {
    this.selectedUser.set(usuario);
    this.activeView.set('edit');
  }

  closeForm(): void {
    this.selectedUser.set(null);
    this.activeView.set('list');
  }

  handleCreateSubmit(payload: Partial<User>): void {
    this.service.create(payload).subscribe({
      next: (created) => {
        this.users.update((items) => [created, ...items]);
        this.total.set(this.total() + 1);
        this.closeForm();
      },
      error: () => this.closeForm(),
    });
  }

  handleEditSubmit(payload: Partial<User>): void {
    const usuario = this.selectedUser();
    if (!usuario?.id) {
      this.closeForm();
      return;
    }

    this.service.update(usuario.id, payload).subscribe({
      next: (updated) => {
        this.users.update((items) => items.map((item) => (item.id === usuario.id ? { ...item, ...updated } : item)));
        this.closeForm();
      },
      error: () => this.closeForm(),
    });
  }

  eliminarUsuario(usuario: User): void {
    this.service.delete(usuario.id).subscribe({
      next: () => {
        this.users.update((items) => items.filter((item) => item.id !== usuario.id));
        this.total.set(Math.max(this.total() - 1, 0));
      },
    });
  }
}
