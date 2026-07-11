import { Component, effect, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';

import { Compania } from '../../../../core/models/compania.model';
import { CompaniaService } from '../../../../core/services/compania/compania.service';
import { LvPageTemplateComponent } from '../../../../shared/ui/templates/page-template/page-template';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDynamicFormComponent } from '../../../../shared/ui/organisms/dynamic-form/dynamic-form';
import { LvFormFieldConfig } from '../../../../shared/types/form-field.type';
import { LvCardComponent } from "../../../../shared/ui/atoms";

@Component({
  selector: 'app-edit-compania-page',
  standalone: true,
  imports: [
    CommonModule,
    LvPageTemplateComponent,
    LvDynamicFormComponent,
    LvPageHeaderComponent,
    LvButtonComponent,
    LvCardComponent
],
  templateUrl: './edit-page.html',
})
export class EditCompaniaPage {
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(CompaniaService);
  private readonly fb = inject(FormBuilder);

  readonly compania = signal<Compania | null>(null);
  readonly loading = signal(true);
  readonly breadcrumb = signal([
    { label: 'Inicio', route: '/' },
    { label: 'Compañías', route: '/companias' },
    { label: 'Editar compañía' },
  ]);

  readonly fields = signal<LvFormFieldConfig[]>([
    { key: 'nombre', type: 'text', label: 'Nombre', placeholder: 'Ej. Compañía ABC', required: true },
    { key: 'ruc', type: 'text', label: 'RUC', placeholder: 'Ej. 20123456789', required: true },
    { key: 'direccion', type: 'text', label: 'Dirección', placeholder: 'Ej. Av. Siempre Viva 742', required: true },
  ]);

  readonly form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required]],
    ruc: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
  });

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
          this.form.patchValue({
            nombre: compania.nombre,
            ruc: compania.ruc,
            direccion: compania.direccion,
          });
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

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const compania = this.compania();
    if (!compania?.id) {
      void this.router.navigateByUrl('/companias');
      return;
    }

    const payload: Partial<Compania> = this.form.getRawValue();
    this.service.update(compania.id, payload).subscribe({
      next: () => void this.router.navigateByUrl('/companias'),
      error: () => void this.router.navigateByUrl('/companias'),
    });
  }
}
