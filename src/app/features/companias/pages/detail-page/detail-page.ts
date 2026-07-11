import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Compania } from '../../../../core/models/compania.model';
import { CompaniaService } from '../../../../core/services/compania/compania.service';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import { LvDetailListComponent } from '../../../../shared/ui/molecules/detail-list/detail-list';


@Component({
  selector: 'app-detail-compania-page',
  standalone: true,
  imports: [CommonModule, LvPageHeaderComponent, LvButtonComponent, LvDetailListComponent],
  templateUrl: './detail-page.html',
})
export class DetailCompaniaPage {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(CompaniaService);

  readonly compania = signal<Compania | null>(null);
  readonly loading = signal(true);
  readonly breadcrumb = signal([
    { label: 'Inicio', route: '/' },
    { label: 'Compañías', route: '/companias' },
    { label: 'Detalle de compañía' },
  ]);

  constructor() {
    effect(() => {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      if (!id) {
        void this.router.navigateByUrl('/companias');
        return;
      }

      this.loading.set(true);
      this.service.get(id).subscribe({
        next: (compania) => {
          this.compania.set(compania);
          this.loading.set(false);
        },
        error: () => {
          this.loading.set(false);
          void this.router.navigateByUrl('/companias');
        },
      });
    });
  }

  onCancel(): void {
    void this.router.navigateByUrl('/companias');
  }
}
