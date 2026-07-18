import { Component, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';

import { TipoUnidadMedida } from '../../../../core/models/tipo-unidad-medida.model';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDetailListComponent } from '../../../../shared/ui/molecules/detail-list/detail-list';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import type { BreadcrumbItem } from '../../../../shared/interfaces/breadcrumb.interface';

@Component({
  selector: 'app-detail-tipo-unidad-medida',
  standalone: true,
  imports: [LvButtonComponent, LvDetailListComponent, LvPageHeaderComponent],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class DetailTipoUnidadMedida {
  private readonly router = inject(Router);

  readonly tipo = input<TipoUnidadMedida | null>(null);

  readonly breadcrumb = signal<BreadcrumbItem[]>([
    { label: 'Inicio', path: '/' },
    { label: 'Tipos de unidad de medida' },
  ]);

  get items() {
    const tipo = this.tipo();
    if (!tipo) return [];

    return [
      { label: 'ID', value: tipo.id },
      { label: 'Nombre', value: tipo.nombre },
      { label: 'Descripción', value: tipo.descripcion || 'Sin descripción' },
    ];
  }

  onCancel(): void {
    void this.router.navigate(['/tipos-unidad-medida']);
  }
}
