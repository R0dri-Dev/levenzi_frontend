import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Instalacion } from '../../../../core/models/instalacion.model';
import { InstalacionService } from '../../../../core/services/instalaciones/instalacion.service';
import { SedeService } from '../../../../core/services/sede/sede.service';

import type { LvFormFieldConfig } from '../../../../shared/types/form-field.type';

import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDynamicFormComponent } from '../../../../shared/ui/organisms/dynamic-form/dynamic-form';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import { Option } from '../../../../shared/interfaces/option.interface';

@Component({
  selector: 'app-create-instalacion',
  standalone: true,
  imports: [LvPageHeaderComponent, LvButtonComponent, LvDynamicFormComponent, ReactiveFormsModule],
  templateUrl: './create.html',
  styleUrl: './create.css',
})
export class CreateInstalacion {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly service = inject(InstalacionService);
  private readonly sedeService = inject(SedeService);

  readonly breadcrumb = signal([
    { label: 'Inicio', route: '/' },
    { label: 'Instalaciones', route: '/instalaciones' },
    { label: 'Nuevo instalación' },
  ]);

  readonly loading = signal(false);

  private readonly sedeOptions = signal<Option[]>([]);

  readonly form = this.fb.nonNullable.group({
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    sede_id: ['', [Validators.required]],
    tipo: [''],
    activo: [true],
  });

  readonly fields = computed<LvFormFieldConfig[]>(() => [
    {
      key: 'nombre',
      label: 'Nombre',
      type: 'text',
      required: true,
      placeholder: 'Ej. Instalación A',
    },
    {
      key: 'sede_id',
      label: 'Sede',
      type: 'select',
      required: true,
      placeholder: 'Selecciona una sede',
      options: this.sedeOptions(),
    },
    {
      key: 'tipo',
      label: 'Tipo',
      type: 'text',
      required: false,
      placeholder: 'Ej. Interna',
    },
  ]);

  constructor() {
    this.sedeService.list().subscribe({
      next: (response) => {
        this.sedeOptions.set(
          response.data.map((sede) => ({
            label: sede.nombre,
            value: String(sede.id),
          }))
        );
      },
    });
  }

  onCancel(): void {
    void this.router.navigateByUrl('/instalaciones');
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    const payload: Partial<Instalacion> = {
      nombre: value.nombre,
      sede_id: Number(value.sede_id),
      tipo: value.tipo || undefined,
      activo: true,
    };

    this.loading.set(true);
    this.service.create(payload).subscribe({
      next: () => {
        this.loading.set(false);
        void this.router.navigateByUrl('/instalaciones');
      },
      error: () => {
        this.loading.set(false);
        void this.router.navigateByUrl('/instalaciones');
      },
    });
  }
}

