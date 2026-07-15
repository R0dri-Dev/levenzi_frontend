import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDetailListComponent } from '../../../../shared/ui/molecules/detail-list/detail-list';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';

import type { BreadcrumbItem } from '../../../../shared/interfaces/breadcrumb.interface';

import { Modulo } from '../../../../core/models/modulo.model';
import { ModuloService } from '../../../../core/services/modulos/modulo.service';

@Component({
  selector: 'app-detail-modulo',
  standalone: true,
  imports: [LvButtonComponent, LvDetailListComponent, LvPageHeaderComponent],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class DetailModulo {
  private readonly service = inject(ModuloService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly loading = signal(true);
  readonly modulo = signal<Modulo | null>(null);

  readonly id = computed(() => Number(this.route.snapshot.paramMap.get('id') ?? 0));

  readonly breadcrumb = signal<BreadcrumbItem[]>([
    { label: 'Inicio', path: '/' },
    { label: 'Módulos' },
    { label: 'Detalle de módulo' },
  ]);

  readonly items = computed(() => {
    const modulo = this.modulo();
    if (!modulo) return [];

    return [
      { label: 'ID', value: modulo.id },
      { label: 'Nombre', value: modulo.nombre },
      { label: 'Código', value: modulo.codigo || 'Sin código' },
      { label: 'Descripción', value: modulo.descripcion || 'Sin descripción' },
    ];
  });

  constructor() {
    void this.load();
  }

  private load(): void {
    const id = this.id();
    if (!id) {
      this.loading.set(false);
      return;
    }

    this.loading.set(true);

    this.service.show(id).subscribe({
      next: (modulo) => {
        this.modulo.set(modulo);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  onCancel(): void {
    void this.router.navigateByUrl('/modulos');
  }
}

