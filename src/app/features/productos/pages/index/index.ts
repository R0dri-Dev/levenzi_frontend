import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

import { Producto } from '../../../../core/models/producto.model';
import { ProductoService } from '../../../../core/services/productos/producto.service';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDataTableComponent } from '../../../../shared/ui/organisms/data-table/data-table';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import type { TableAction, TableColumn } from '../../../../shared/interfaces/table.interface';
import { formatDecimal } from '../../../../shared/utils/format-number.util';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [LvPageHeaderComponent, LvButtonComponent, LvDataTableComponent],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {
  private readonly service = inject(ProductoService);
  private readonly router = inject(Router);

  readonly productos = signal<Producto[]>([]);
  readonly total = signal(0);
  readonly loading = signal(true);
  readonly searchTerm = signal('');

  readonly columns: TableColumn<Producto>[] = [
    { key: 'id', label: 'ID', width: '88px', sortable: true, render: (item) => `#${item.id}` },
    { key: 'nombre', label: 'Nombre', sortable: true, render: (item) => item.nombre },
    { key: 'codigo', label: 'Código', sortable: true, render: (item) => item.codigo },
    {
      key: 'precio',
      label: 'Precio',
      sortable: true,
      render: (item) => `S/ ${formatDecimal(item.precio, 2)}`,
    }, {
      key: 'activo',
      label: 'Estado',
      sortable: true,
      render: (item) => (item.activo ? 'Activo' : 'Inactivo'),
    },
  ];
  readonly tableActions: TableAction<Producto>[] = [
    { label: 'Ver detalle', action: (item) => this.verDetalle(item), variant: 'secondary' },
    { label: 'Editar', action: (item) => this.editarProducto(item), variant: 'primary' },
    { label: 'Eliminar', action: (item) => this.eliminarProducto(item), variant: 'danger' },
  ];

  readonly filteredProductos = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return this.productos();

    return this.productos().filter((producto) =>
      [
        producto.nombre,
        producto.codigo,
        producto.descripcion ?? '',
        producto.precio,
        producto.activo ? 'activo' : 'inactivo',
      ].some((field) => field.toString().toLowerCase().includes(term)),
    );
  });

  constructor() {
    this.load();
  }

  breadcrumb = signal([{ label: 'Inicio', route: '/' }, { label: 'Productos' }]);

  load(page = 1): void {
    this.loading.set(true);
    this.service.list(page).subscribe({
      next: (response) => {
        this.productos.set(response.data);
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
    this.router.navigate(['/productos/create']);
  }

  verDetalle(producto: Producto): void {
    this.router.navigate(['/productos', producto.id]);
  }

  editarProducto(producto: Producto): void {
    this.router.navigate(['/productos', producto.id, 'edit']);
  }

  eliminarProducto(producto: Producto): void {
    this.service.delete(producto.id).subscribe({
      next: () => {
        this.productos.update((items) => items.filter((item) => item.id !== producto.id));
        this.total.set(Math.max(this.total() - 1, 0));
      },
    });
  }
}

