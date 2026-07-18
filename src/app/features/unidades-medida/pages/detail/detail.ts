import { Component, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';

import { UnidadMedida } from '../../../../core/models/unidad-medida.model';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDetailListComponent } from '../../../../shared/ui/molecules/detail-list/detail-list';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import type { BreadcrumbItem } from '../../../../shared/interfaces/breadcrumb.interface';

@Component({
  selector: 'app-detail-unidad-medida',
  standalone: true,
  imports: [LvButtonComponent, LvDetailListComponent, LvPageHeaderComponent],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class DetailUnidadMedida {
  private readonly router = inject(Router);

  readonly unidad = input<UnidadMedida | null>(null);

  readonly breadcrumb = signal<BreadcrumbItem[]>([
    { label: 'Inicio', path: '/' },
    { label: 'Unidades de medida' },
  ]);

  get items() {
    const unidad = this.unidad();
    if (!unidad) return [];

    return [
      { label: 'ID', value: unidad.id },
      { label: 'Nombre', value: unidad.nombre },
      { label: 'Símbolo', value: unidad.simbolo },
      { label: 'Tipo de unidad', value: unidad.tipo_unidad_medida_id },
      { label: 'Factor base', value: unidad.factor_base },
      { label: 'Es base', value: unidad.base ? 'Sí' : 'No' },
      { label: 'Permite conversión', value: unidad.conversion ? 'Sí' : 'No' },
      { label: 'Estado', value: unidad.activo ? 'Activo' : 'Inactivo' },
    ];
  }

  onCancel(): void {
    void this.router.navigate(['/unidades-medida']);
  }
}
