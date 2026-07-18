import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { FamiliaService } from '../../../../core/services/familias/familia.service';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDynamicFormComponent } from '../../../../shared/ui/organisms/dynamic-form/dynamic-form';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import type { LvFormFieldConfig } from '../../../../shared/types/form-field.type';

@Component({
  selector: 'app-create-familia',
  standalone: true,
  imports: [LvPageHeaderComponent, LvButtonComponent, LvDynamicFormComponent],
  templateUrl: './create.html',
  styleUrl: './create.css',
})
export class CreateFamilia {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly service = inject(FamiliaService);

  readonly breadcrumb = signal([
    { label: 'Inicio', route: '/' },
    { label: 'Familias', route: '/familias' },
    { label: 'Nueva familia' },
  ]);

  readonly loading = signal(false);
  readonly familiaOptions = signal<{ label: string; value: string }[]>([]);

  readonly form = this.fb.nonNullable.group({
    familia_padre_id: [''],
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    descripcion: [''],
  });

  readonly fields = computed((): LvFormFieldConfig[] => [
    {
      key: 'nombre',
      label: 'Nombre',
      type: 'text',
      required: true,
      placeholder: 'Ej. Medicamentos',
    },
    {
      key: 'familia_padre_id',
      label: 'Familia padre',
      type: 'select',
      required: false,
      placeholder: 'Selecciona una familia padre (opcional)',
      options: this.familiaOptions(),
      hint: 'Déjalo vacío si esta es una familia raíz.',
    },
    {
      key: 'descripcion',
      label: 'Descripción',
      type: 'text',
      required: false,
      placeholder: 'Ej. Familia de productos médicos',
    },
  ]);

  constructor() {
    this.loadFamilias();
  }

  private loadFamilias(): void {
    this.service.list().subscribe({
      next: (response) => {
        this.familiaOptions.set(
          response.data.map((f) => ({
            label: f.nombre,
            value: String(f.id),
          }))
        );
      },
    });
  }

  onCancel(): void {
    void this.router.navigate(['/familias']);
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
      familia_padre_id: value.familia_padre_id ? Number(value.familia_padre_id) : undefined,
      descripcion: value.descripcion || undefined,
      activo: true,
    };

    this.service.create(payload).subscribe({
      next: () => {
        this.loading.set(false);
        void this.router.navigate(['/familias']);
      },
      error: () => {
        this.loading.set(false);
        void this.router.navigate(['/familias']);
      },
    });
  }
}
