import { Component, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';

import { ProductoConversion } from '../../../../core/models/producto-conversion.model';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDetailListComponent } from '../../../../shared/ui/molecules/detail-list/detail-list';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import type { BreadcrumbItem } from '../../../../shared/interfaces/breadcrumb.interface';

@Component({
  selector: 'app-detail-producto-conversion',
  standalone: true,
  imports: [LvButtonComponent, LvDetailListComponent, LvPageHeaderComponent],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class DetailProductoConversion {
  private readonly router = inject(Router);

  readonly conversion = input<ProductoConversion | null>(null);

  readonly breadcrumb = signal<BreadcrumbItem[]>([
    { label: 'Inicio', path: '/' },
    { label: 'Conversiones de producto' },
  ]);

  get items() {
    const conversion = this.conversion();
    if (!conversion) return [];

    return [
      { label: 'ID', value: conversion.id },
      { label: 'Producto', value: conversion.producto_id },
      { label: 'Unidad de origen', value: conversion.unidad_medida_origen_id },
      { label: 'Unidad de destino', value: conversion.unidad_medida_destino_id },
      { label: 'Factor de conversión', value: conversion.factor_conversion },
      { label: 'Estado', value: conversion.activo ? 'Activo' : 'Inactivo' },
    ];
  }

  onCancel(): void {
    void this.router.navigate(['/producto-conversiones']);
  }
}
