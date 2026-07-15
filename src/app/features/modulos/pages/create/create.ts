import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LvDynamicFormComponent } from '../../../../shared/ui/organisms/dynamic-form/dynamic-form';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import type { LvFormFieldConfig } from '../../../../shared/types/form-field.type';

import { Modulo } from '../../../../core/models/modulo.model';
import { ModuloService } from '../../../../core/services/modulos/modulo.service';

@Component({
  selector: 'app-create-modulo',
  standalone: true,
  imports: [ReactiveFormsModule, LvPageHeaderComponent, LvButtonComponent, LvDynamicFormComponent],
  templateUrl: './create.html',
  styleUrl: './create.css',
})
export class CreateModulo {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly service = inject(ModuloService);

  readonly breadcrumb = signal([
    { label: 'Inicio', route: '/' },
    { label: 'Módulos', route: '/modulos' },
    { label: 'Nuevo módulo' },
  ]);

  readonly loading = signal(false);

  readonly form = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    codigo: ['', Validators.required],
    descripcion: [''],
  });

  readonly fields = computed<LvFormFieldConfig[]>(() => [
    {
      key: 'nombre',
      label: 'Nombre',
      type: 'text',
      required: true,
      placeholder: 'Ej. Módulo A',
    },
    {
      key: 'codigo',
      label: 'Código',
      type: 'text',
      required: true,
      placeholder: 'Ej. MOD-001',
    },
    {
      key: 'descripcion',
      label: 'Descripción',
      type: 'text',
      required: false,
      placeholder: 'Ej. Descripción del módulo',
    },
  ]);

  onCancel(): void {
    void this.router.navigateByUrl('/modulos');
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    const payload: Partial<Modulo> = {
      nombre: value.nombre,
      codigo: value.codigo,
      descripcion: value.descripcion || undefined,
    };

    this.loading.set(true);

    this.service.create(payload).subscribe({
      next: () => {
        this.loading.set(false);
        void this.router.navigateByUrl('/modulos');
      },
      error: () => {
        this.loading.set(false);
        void this.router.navigateByUrl('/modulos');
      },
    });
  }
}

