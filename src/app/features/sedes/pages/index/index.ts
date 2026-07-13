import { Component, computed, inject, signal } from '@angular/core';
import { Sede } from '../../../../core/models/sede.model';
import { SedeService } from '../../../../core/services/sede/sede.service';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDataTableComponent } from '../../../../shared/ui/organisms/data-table/data-table';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import { LvSearchBoxComponent } from '../../../../shared/ui/molecules/search-box/search-box';
import type { TableAction, TableColumn } from '../../../../shared/interfaces/table.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [LvPageHeaderComponent, LvButtonComponent, LvDataTableComponent, LvSearchBoxComponent,],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {
  private readonly service = inject(SedeService);
  private readonly router = inject(Router);

  readonly sedes = signal<Sede[]>([]);
  readonly total = signal(0);
  readonly loading = signal(true);
  readonly searchTerm = signal('');

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

  openCreateForm(): void {
    this.router.navigate(['/sedes/create']);
  }

  verDetalle(sede: Sede): void {
    this.router.navigate(['/sedes', sede.id]);
  }

  editarSede(sede: Sede): void {
    this.router.navigate(['/sedes', sede.id, 'edit']);
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
