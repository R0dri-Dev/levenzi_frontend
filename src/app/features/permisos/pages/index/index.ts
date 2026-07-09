import { Component, computed, inject, signal } from '@angular/core';

import { Permiso } from '../../../../core/models/permiso.model';
import { PermisoService } from '../../../../core/services/permiso/permiso.service';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDataTableComponent } from '../../../../shared/ui/organisms/data-table/data-table';
import { LvModalComponent } from '../../../../shared/ui/organisms/modal/modal';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import { LvSearchBoxComponent } from '../../../../shared/ui/molecules/search-box/search-box';
import type { TableAction, TableColumn } from '../../../../shared/interfaces/table.interface';
import { Create } from '../create/create';
import { Edit } from '../edit/edit';
import { Detail } from '../detail/detail';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    LvPageHeaderComponent,
    LvButtonComponent,
    LvDataTableComponent,
    LvModalComponent,
    LvSearchBoxComponent,
    Create,
    Edit,
    Detail,
  ],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {
  private readonly service = inject(PermisoService);

  readonly permisos = signal<Permiso[]>([]);
  readonly total = signal(0);
  readonly loading = signal(true);
  readonly searchTerm = signal('');
  readonly activeView = signal<'list' | 'create' | 'edit' | 'detail'>('list');
  readonly selectedPermiso = signal<Permiso | null>(null);

  readonly columns: TableColumn<Permiso>[] = [
    {
      key: 'id',
      label: 'ID',
      width: '88px',
      sortable: true,
      render: (item) => `#${item.id}`,
    },
    {
      key: 'name',
      label: 'Permiso',
      sortable: true,
      render: (item) => item.name,
    },
    {
      key: 'guard_name',
      label: 'Guard',
      sortable: true,
      render: (item) => item.guard_name,
    },
    {
      key: 'created_at',
      label: 'Creado',
      sortable: true,
      render: (item) => (item.created_at ? new Date(item.created_at).toLocaleDateString('es-ES') : 'Sin fecha'),
    },
  ];

  readonly tableActions: TableAction<Permiso>[] = [
    {
      label: 'Ver detalle',
      action: (item) => this.verDetalle(item),
      variant: 'secondary',
    },
    {
      label: 'Editar',
      action: (item) => this.editarPermiso(item),
      variant: 'primary',
    },
    {
      label: 'Desactivar',
      action: (item) => this.eliminarPermiso(item),
      variant: 'danger',
    },
  ];

  readonly filteredPermisos = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();

    if (!term) {
      return this.permisos();
    }

    return this.permisos().filter((permiso) => {
      const name = permiso.name?.toLowerCase() ?? '';
      const guard = permiso.guard_name?.toLowerCase() ?? '';
      const created = permiso.created_at?.toLowerCase() ?? '';

      return name.includes(term) || guard.includes(term) || created.includes(term);
    });
  });

  readonly currentHeaderTitle = computed(() => {
    switch (this.activeView()) {
      case 'create':
        return 'Crear permiso';
      case 'edit':
        return 'Editar permiso';
      case 'detail':
        return 'Detalle del permiso';
      default:
        return 'Permisos';
    }
  });

  readonly currentHeaderSubtitle = computed(() => {
    switch (this.activeView()) {
      case 'create':
        return 'Registra un nuevo permiso para el sistema.';
      case 'edit':
        return 'Actualiza los datos del permiso seleccionado.';
      case 'detail':
        return 'Consulta la información registrada para este permiso.';
      default:
        return 'Gestiona los accesos del sistema desde una vista centralizada.';
    }
  });

  constructor() {
    this.load();
  }

  breadcrumb = signal([
    {
      label: 'Inicio',
      route: '/',
    },
    {
      label: 'Seguridad',
    },
    {
      label: 'Permisos',
    },
  ]);

  load(): void {
    this.loading.set(true);

    this.service.list().subscribe({
      next: (response) => {
        this.permisos.set(response.data);
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
    this.selectedPermiso.set(null);
    this.activeView.set('create');
  }

  verDetalle(permiso: Permiso): void {
    this.selectedPermiso.set(permiso);
    this.activeView.set('detail');
  }

  editarPermiso(permiso: Permiso): void {
    this.selectedPermiso.set(permiso);
    this.activeView.set('edit');
  }

  closeForm(): void {
    this.selectedPermiso.set(null);
    this.activeView.set('list');
  }

  handleCreateSubmit(payload: Partial<Permiso>): void {
    this.service.create(payload).subscribe({
      next: (created) => {
        this.permisos.update((items) => [created, ...items]);
        this.total.set(this.total() + 1);
        this.closeForm();
      },
      error: () => {
        this.closeForm();
      },
    });
  }

  handleEditSubmit(payload: Partial<Permiso>): void {
    const permiso = this.selectedPermiso();
    if (!permiso?.id) {
      this.closeForm();
      return;
    }

    this.service.update(permiso.id, payload).subscribe({
      next: (updated) => {
        this.permisos.update((items) => items.map((item) => (item.id === permiso.id ? { ...item, ...updated } : item)));
        this.closeForm();
      },
      error: () => {
        this.closeForm();
      },
    });
  }

  eliminarPermiso(permiso: Permiso): void {
    this.service.delete(permiso.id).subscribe({
      next: () => {
        this.permisos.update((items) => items.filter((item) => item.id !== permiso.id));
        this.total.set(Math.max(this.total() - 1, 0));
      },
    });
  }
}
