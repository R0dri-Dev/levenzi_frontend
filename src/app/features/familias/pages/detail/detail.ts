import { Component, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';

import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDetailListComponent } from '../../../../shared/ui/molecules/detail-list/detail-list';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import type { BreadcrumbItem } from '../../../../shared/interfaces/breadcrumb.interface';
import { Familia } from '../../../../core/models/familia-model';

@Component({
  selector: 'app-detail-familia',
  standalone: true,
  imports: [LvButtonComponent, LvDetailListComponent, LvPageHeaderComponent],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class DetailFamilia {
  private readonly router = inject(Router);

  readonly familia = input<Familia | null>(null);

  readonly breadcrumb = signal<BreadcrumbItem[]>([
    { label: 'Inicio', path: '/' },
    { label: 'Familias' },
  ]);

  get items() {
    const familia = this.familia();
    if (!familia) return [];

    return [
      { label: 'ID', value: familia.id },
      { label: 'Nombre', value: familia.nombre },
      { label: 'Familia padre', value: familia.familia_padre_id ?? 'Sin padre (raíz)' },
      { label: 'Descripción', value: familia.descripcion || 'Sin descripción' },
      { label: 'Estado', value: familia.activo ? 'Activo' : 'Inactivo' },
    ];
  }

  onCancel(): void {
    void this.router.navigate(['/familias']);
  }
}
