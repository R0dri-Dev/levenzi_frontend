import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDynamicFormComponent } from '../../../../shared/ui/organisms/dynamic-form/dynamic-form';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import type { LvFormFieldConfig } from '../../../../shared/types/form-field.type';
import { TipoUnidadMedidaService } from '../../../../core/services/tipos-unidad-medida/tipos-unidad-medida.service';

@Component({
  selector: 'app-create-tipo-unidad-medida',
  standalone: true,
  imports: [LvPageHeaderComponent, LvButtonComponent, LvDynamicFormComponent],
  templateUrl: './create.html',
  styleUrl: './create.css',
})
export class CreateTipoUnidadMedida {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly service = inject(TipoUnidadMedidaService);

  readonly breadcrumb = signal([
    { label: 'Inicio', route: '/' },
    { label: 'Tipos de unidad de medida', route: '/tipos-unidad-medida' },
    { label: 'Nuevo tipo' },
  ]);

  readonly loading = signal(false);

  readonly form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    descripcion: [''],
  });

  readonly fields = computed((): LvFormFieldConfig[] => [
    {
      key: 'nombre',
      label: 'Nombre',
      type: 'text',
      required: true,
      placeholder: 'Ej. Peso',
    },
    {
      key: 'descripcion',
      label: 'Descripción',
      type: 'text',
      required: false,
      placeholder: 'Ej. Unidades relacionadas al peso',
    },
  ]);

  onCancel(): void {
    void this.router.navigate(['/tipos-unidad-medida']);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    const value = this.form.getRawValue();

    const payload = {
      ...value,
      descripcion: value.descripcion || undefined,
    };

    this.service.create(payload).subscribe({
      next: () => {
        this.loading.set(false);
        void this.router.navigate(['/tipos-unidad-medida']);
      },
      error: () => {
        this.loading.set(false);
        void this.router.navigate(['/tipos-unidad-medida']);
      },
    });
  }
}
