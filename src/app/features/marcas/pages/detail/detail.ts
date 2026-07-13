import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Marca } from '../../../../core/models/marca.model';
import { MarcaService } from '../../../../core/services/marcas/marca.service';

import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDetailListComponent } from '../../../../shared/ui/molecules/detail-list/detail-list';

@Component({
  selector: 'app-detail-marca',
  standalone: true,
  imports: [LvPageHeaderComponent, LvButtonComponent, LvDetailListComponent],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class DetailMarca {
  private readonly service = inject(MarcaService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly loading = signal(true);
  readonly marca = signal<Marca | null>(null);

  readonly id = computed(() => Number(this.route.snapshot.paramMap.get('id') ?? 0));

  readonly breadcrumb = signal([
    { label: 'Inicio', route: '/' },
    { label: 'Marcas', route: '/marcas' },
    { label: 'Detalle de marca' },
  ]);

  readonly items = computed<{ label: string; value: unknown }[]>(() => {
    const marca = this.marca();
    if (!marca) return [];

    return [
      { label: 'ID', value: marca.id },
      { label: 'Nombre', value: marca.nombre },
      { label: 'Código', value: marca.codigo || 'Sin código' },
      { label: 'Descripción', value: marca.descripcion || 'Sin descripción' },
      { label: 'Estado', value: marca.activo ? 'Activo' : 'Inactivo' },
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
      next: (marca) => {
        this.marca.set(marca);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  onCancel(): void {
    void this.router.navigateByUrl('/marcas');
  }
}

