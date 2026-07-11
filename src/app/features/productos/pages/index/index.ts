import { Component, computed, inject, signal } from '@angular/core';

import { Producto } from '../../../../core/models/producto.model';
import { ProductoService } from '../../../../core/services/productos/producto.service';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDataTableComponent } from '../../../../shared/ui/organisms/data-table/data-table';
import { LvModalComponent } from '../../../../shared/ui/organisms/modal/modal';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import { LvSearchBoxComponent } from '../../../../shared/ui/molecules/search-box/search-box';
import type { TableAction, TableColumn } from '../../../../shared/interfaces/table.interface';
import { CreateProducto } from '../create/create';
import { EditProducto } from '../edit/edit';
import { DetailProducto } from '../detail/detail';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [LvPageHeaderComponent, LvButtonComponent, LvDataTableComponent, LvModalComponent, LvSearchBoxComponent, CreateProducto, EditProducto, DetailProducto],
  templateUrl: './index.html',
  styleUrl: './index.css',
})
export class Index {
  private readonly service = inject(ProductoService);

  readonly productos = signal<Producto[]>([]);
  readonly total = signal(0);
  readonly loading = signal(true);
  readonly searchTerm = signal('');
  readonly activeView = signal<'list' | 'create' | 'edit' | 'detail'>('list');
  readonly selectedProducto = signal<Producto | null>(null);

  readonly columns: TableColumn<Producto>[] = [
    { key: 'id', label: 'ID', width: '88px', sortable: true, render: (item) => `#${item.id}` },
    { key: 'nombre', label: 'Nombre', sortable: true, render: (item) => item.nombre },
    { key: 'codigo', label: 'Código', sortable: true, render: (item) => item.codigo },
    { key: 'precio', label: 'Precio', sortable: true, render: (item) => item.precio },
    { key: 'activo', label: 'Estado', sortable: true, render: (item) => (item.activo ? 'Activo' : 'Inactivo') },
  ];

  readonly tableActions: TableAction<Producto>[] = [
    { label: 'Ver detalle', action: (item) => this.verDetalle(item), variant: 'secondary' },
    { label: 'Editar', action: (item) => this.editarProducto(item), variant: 'primary' },
    { label: 'Eliminar', action: (item) => this.eliminarProducto(item), variant: 'danger' },
  ];

  readonly filteredProductos = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return this.productos();

    return this.productos().filter((producto) => [producto.nombre, producto.codigo, producto.descripcion ?? '', producto.precio, producto.activo ? 'activo' : 'inactivo'].some((field) => field.toLowerCase().includes(term)));
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
    this.selectedProducto.set(null);
    this.activeView.set('create');
  }

  verDetalle(producto: Producto): void {
    this.selectedProducto.set(producto);
    this.activeView.set('detail');
  }

  editarProducto(producto: Producto): void {
    this.selectedProducto.set(producto);
    this.activeView.set('edit');
  }

  closeForm(): void {
    this.selectedProducto.set(null);
    this.activeView.set('list');
  }

  handleCreateSubmit(payload: Partial<Producto>): void {
    this.service.create(payload).subscribe({
      next: (created) => {
        this.productos.update((items) => [created, ...items]);
        this.total.set(this.total() + 1);
        this.closeForm();
      },
      error: () => this.closeForm(),
    });
  }

  handleEditSubmit(payload: Partial<Producto>): void {
    const producto = this.selectedProducto();
    if (!producto?.id) {
      this.closeForm();
      return;
    }

    this.service.update(producto.id, payload).subscribe({
      next: (updated) => {
        this.productos.update((items) => items.map((item) => (item.id === producto.id ? { ...item, ...updated } : item)));
        this.closeForm();
      },
      error: () => this.closeForm(),
    });
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
