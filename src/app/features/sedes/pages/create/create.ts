import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import { LvDynamicFormComponent } from '../../../../shared/ui/organisms/dynamic-form/dynamic-form';

import { LvFormFieldConfig } from '../../../../shared/types/form-field.type';
import { SedeService } from '../../../../core/services/sede/sede.service';
import { Sede } from '../../../../core/models/sede.model';
import { computed } from '@angular/core';
import { CompaniaService } from '../../../../core/services/compania/compania.service';

@Component({
  selector: 'app-create-sede',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LvPageHeaderComponent,
    LvButtonComponent,
    LvDynamicFormComponent,
  ],
  templateUrl: './create.html',
  styleUrl: './create.css',
})
export class CreateSede {

  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly service = inject(SedeService);
  private readonly companiaService = inject(CompaniaService);

  readonly loading = signal(false);
  readonly companiaOptions = signal<{ label: string; value: string }[]>([]);

  readonly breadcrumb = signal([
    { label: 'Inicio', route: '/' },
    { label: 'Sedes', route: '/sedes' },
    { label: 'Nuevo' },
  ]);

  readonly form = this.fb.group({
    compania_id: ['', Validators.required],
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    codigo: ['', Validators.required],
    direccion: ['', Validators.required],
    telefono: [''],
    activo: [true],
  });

  readonly fields = computed<LvFormFieldConfig[]>(() => [
    {
      key: 'compania_id',
      label: 'Compañía',
      type: 'select',
      required: true,
      placeholder: 'Seleccione una compañía',
      options: this.companiaOptions(),
    },
    {
      key: 'nombre',
      label: 'Nombre',
      type: 'text',
      required: true,
      placeholder: 'Ej. Sede Central',
    },
    {
      key: 'codigo',
      label: 'Código',
      type: 'text',
      required: true,
      placeholder: 'Ej. S01',
    },
    {
      key: 'direccion',
      label: 'Dirección',
      type: 'text',
      required: true,
      placeholder: 'Ej. Av. Principal 123',
    },
    {
      key: 'telefono',
      label: 'Teléfono',
      type: 'text',
      placeholder: '987654321',
    },
  ]);

  ngOnInit(): void {
    this.companiaService.list().subscribe({
      next: (response) => {
        this.companiaOptions.set(
          response.data.map(compania => ({
            label: compania.nombre,
            value: String(compania.id),
          }))
        );
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const value = this.form.getRawValue();

    const payload: Partial<Sede> = {
      compania_id: Number(value.compania_id),
      nombre: value.nombre ?? '',
      codigo: value.codigo ?? '',
      direccion: value.direccion ?? '',
      telefono: value.telefono ?? undefined,
      activo: value.activo ?? true,
    };

    this.service.create(payload).subscribe({
      next: () => {
        this.router.navigate(['/sedes']);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  onCancel(): void {
    this.router.navigate(['/sedes']);
  }
}
