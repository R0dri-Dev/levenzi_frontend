import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { Cliente } from '../../../../core/models/cliente.model';
import { ClienteService } from '../../../../core/services/clientes/cliente.service';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDataTableComponent } from '../../../../shared/ui/organisms/data-table/data-table';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import type { TableAction, TableColumn } from '../../../../shared/interfaces/table.interface';
import { LvDecimalPipe, LvEmptyPipe, LvYesNoPipe } from '../../../../shared/pipes';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [LvPageHeaderComponent, LvButtonComponent, LvDataTableComponent],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {
  private readonly service = inject(ClienteService);
  private readonly router = inject(Router);
  private readonly yesNoPipe = new LvYesNoPipe();
  private readonly emptyPipe = new LvEmptyPipe();
  private readonly decimalPipe = new LvDecimalPipe();
  readonly clientes = signal<Cliente[]>([]);
  readonly total = signal(0);
  readonly loading = signal(true);
  readonly searchTerm = signal('');

  readonly columns: TableColumn<Cliente>[] = [
    { key: 'id', label: 'ID', width: '88px', sortable: true, render: (item) => `#${item.id}` },
    { key: 'nombre', label: 'Nombre', sortable: true, render: (item) => item.nombre },
    { key: 'documento_numero', label: 'Documento', sortable: true, render: (item) => this.emptyPipe.transform(item.documento_numero) },
    {
      key: 'telefono',
      label: 'Teléfono',
      sortable: true,
      render: (item) =>
        item.pais?.codigo_iso2 && item.telefono
          ? {
            type: 'flag',
            iso2: item.pais.codigo_iso2.toLowerCase(),
            text: item.telefono,
          }
          : (item.telefono ?? '-'),
    }, { key: 'activo', label: 'Estado', sortable: true, render: (item) => this.yesNoPipe.transform(item.activo, 'Activo', 'Inactivo') },
  ];

  readonly tableActions: TableAction<Cliente>[] = [
    { label: 'Ver detalle', action: (item) => this.verDetalle(item), variant: 'secondary' },
    { label: 'Editar', action: (item) => this.editarCliente(item), variant: 'primary' },
    { label: 'Eliminar', action: (item) => this.eliminarCliente(item), variant: 'danger' },
  ];

  readonly filteredClientes = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return this.clientes();

    return this.clientes().filter((cliente) =>
      [
        cliente.nombre,
        cliente.documento_numero ?? '',
        cliente.telefono ?? '',
        cliente.email ?? '',
        cliente.activo ? 'activo' : 'inactivo',
      ].some((field) => field.toLowerCase().includes(term))
    );
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
    this.router.navigate(['/clientes/create']);
  }

  verDetalle(cliente: Cliente): void {
    this.router.navigate(['/clientes', cliente.id]);
  }

  editarCliente(cliente: Cliente): void {
    this.router.navigate(['/clientes', cliente.id, 'edit']);
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

