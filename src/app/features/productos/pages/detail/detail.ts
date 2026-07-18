import { Component, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';

import { Producto } from '../../../../core/models/producto.model';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDetailListComponent } from '../../../../shared/ui/molecules/detail-list/detail-list';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import { InstalacionService } from '../../../../core/services/instalaciones/instalacion.service';
import type { BreadcrumbItem } from '../../../../shared/interfaces/breadcrumb.interface';


@Component({
  selector: 'app-detail-producto',
  standalone: true,
  imports: [LvButtonComponent, LvDetailListComponent, LvPageHeaderComponent],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class DetailProducto {
  private readonly router = new Router();

  readonly producto = input<Producto | null>(null);

  readonly breadcrumb = signal<BreadcrumbItem[]>([
    { label: 'Inicio', path: '/' },
    { label: 'Productos' },
  ]);

  get items() {
    const producto = this.producto();
    if (!producto) return [];

    return [
      { label: 'ID', value: producto.id },
      { label: 'Nombre', value: producto.nombre },
      { label: 'Familia', value: producto.familia_id ?? 'Sin familia' },
      { label: 'Código', value: producto.codigo || 'Sin código' },
      { label: 'Precio', value: producto.precio },
      { label: 'Descripción', value: producto.descripcion || 'Sin descripción' },
      { label: 'Estado', value: producto.activo ? 'Activo' : 'Inactivo' },
    ];
  }
  onCancel(): void {
    void this.router.navigate(['/productos']);
  }
}

