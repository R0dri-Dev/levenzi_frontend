import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { FamiliaService } from '../../../../core/services/familias/familia.service';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDataTableComponent } from '../../../../shared/ui/organisms/data-table/data-table';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import type { TableAction, TableColumn } from '../../../../shared/interfaces/table.interface';
import { Familia } from '../../../../core/models/familia-model';
import { LvYesNoPipe } from '../../../../shared/pipes';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [LvPageHeaderComponent, LvButtonComponent, LvDataTableComponent],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {
  private readonly service = inject(FamiliaService);
  private readonly router = inject(Router);
  private readonly yesNoPipe = new LvYesNoPipe();

  readonly familias = signal<Familia[]>([]);
  readonly total = signal(0);
  readonly loading = signal(true);
  readonly searchTerm = signal('');

  readonly columns: TableColumn<Familia>[] = [
    { key: 'id', label: 'ID', width: '88px', sortable: true, render: (item) => `#${item.id}` },
    { key: 'nombre', label: 'Nombre', sortable: true, render: (item) => item.nombre },
    { key: 'familia_padre_id', label: 'Familia padre', sortable: true, render: (item) => (item.familia_padre_id ? `#${item.familia_padre_id}` : 'Sin padre (raíz)') },
    { key: 'activo', label: 'Estado', sortable: true, render: (item) => this.yesNoPipe.transform(item.activo, 'Activo', 'Inactivo') }
  ]

  readonly tableActions: TableAction<Familia>[] = [
    { label: 'Ver detalle', action: (item) => this.verDetalle(item), variant: 'secondary' },
    { label: 'Editar', action: (item) => this.editar(item), variant: 'primary' },
    { label: 'Eliminar', action: (item) => this.eliminar(item), variant: 'danger' },
  ];

  readonly filteredFamilias = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return this.familias();

    return this.familias().filter((familia) =>
      [familia.nombre, familia.descripcion ?? ''].some((field) => field.toString().toLowerCase().includes(term))
    );
  });

  breadcrumb = signal([{ label: 'Inicio', route: '/' }, { label: 'Familias' }]);

  constructor() {
    this.load();
  }

  load(page = 1): void {
    this.loading.set(true);
    this.service.list(page).subscribe({
      next: (response) => {
        this.familias.set(response.data);
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
    this.router.navigate(['/familias/create']);
  }

  verDetalle(familia: Familia): void {
    this.router.navigate(['/familias', familia.id]);
  }

  editar(familia: Familia): void {
    this.router.navigate(['/familias', familia.id, 'edit']);
  }

  eliminar(familia: Familia): void {
    this.service.delete(familia.id).subscribe({
      next: () => {
        this.familias.update((items) => items.filter((item) => item.id !== familia.id));
        this.total.set(Math.max(this.total() - 1, 0));
      },
    });
  }
}
