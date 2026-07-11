import { Component, computed, inject, signal } from '@angular/core';

import { Role } from '../../../../core/models/role.model';
import { RoleService } from '../../../../core/services/roles/role.service';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDataTableComponent } from '../../../../shared/ui/organisms/data-table/data-table';
import { LvModalComponent } from '../../../../shared/ui/organisms/modal/modal';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import { LvSearchBoxComponent } from '../../../../shared/ui/molecules/search-box/search-box';
import type { TableAction, TableColumn } from '../../../../shared/interfaces/table.interface';
import { CreateRole } from '../create/create';
import { EditRole } from '../edit/edit';
import { DetailRole } from '../detail/detail';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [LvPageHeaderComponent, LvButtonComponent, LvDataTableComponent, LvModalComponent, LvSearchBoxComponent, CreateRole, EditRole, DetailRole],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {
  private readonly service = inject(RoleService);

  readonly roles = signal<Role[]>([]);
  readonly total = signal(0);
  readonly loading = signal(true);
  readonly searchTerm = signal('');
  readonly activeView = signal<'list' | 'create' | 'edit' | 'detail'>('list');
  readonly selectedRole = signal<Role | null>(null);

  readonly columns: TableColumn<Role>[] = [
    { key: 'id', label: 'ID', width: '88px', sortable: true, render: (item) => `#${item.id}` },
    { key: 'name', label: 'Nombre', sortable: true, render: (item) => item.name },
    { key: 'guard_name', label: 'Guard', sortable: true, render: (item) => item.guard_name ?? '-' },
  ];

  readonly tableActions: TableAction<Role>[] = [
    { label: 'Ver detalle', action: (item) => this.verDetalle(item), variant: 'secondary' },
    { label: 'Editar', action: (item) => this.editarRole(item), variant: 'primary' },
    { label: 'Eliminar', action: (item) => this.eliminarRole(item), variant: 'danger' },
  ];

  readonly filteredRoles = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return this.roles();

    return this.roles().filter((role) => [role.name, role.guard_name ?? ''].some((field) => field.toLowerCase().includes(term)));
  });

  constructor() {
    this.load();
  }

  breadcrumb = signal([{ label: 'Inicio', route: '/' }, { label: 'Roles' }]);

  load(page = 1): void {
    this.loading.set(true);
    this.service.list(page).subscribe({
      next: (response) => {
        this.roles.set(response.data);
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
    this.selectedRole.set(null);
    this.activeView.set('create');
  }

  verDetalle(role: Role): void {
    this.selectedRole.set(role);
    this.activeView.set('detail');
  }

  editarRole(role: Role): void {
    this.selectedRole.set(role);
    this.activeView.set('edit');
  }

  closeForm(): void {
    this.selectedRole.set(null);
    this.activeView.set('list');
  }

  handleCreateSubmit(payload: Partial<Role>): void {
    this.service.create(payload).subscribe({
      next: (created) => {
        this.roles.update((items) => [created, ...items]);
        this.total.set(this.total() + 1);
        this.closeForm();
      },
      error: () => this.closeForm(),
    });
  }

  handleEditSubmit(payload: Partial<Role>): void {
    const role = this.selectedRole();
    if (!role?.id) {
      this.closeForm();
      return;
    }

    this.service.update(role.id, payload).subscribe({
      next: (updated) => {
        this.roles.update((items) => items.map((item) => (item.id === role.id ? { ...item, ...updated } : item)));
        this.closeForm();
      },
      error: () => this.closeForm(),
    });
  }

  eliminarRole(role: Role): void {
    this.service.delete(role.id!).subscribe({
      next: () => {
        this.roles.update((items) => items.filter((item) => item.id !== role.id));
        this.total.set(Math.max(this.total() - 1, 0));
      },
    });
  }
}
