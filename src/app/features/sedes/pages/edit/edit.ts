import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import { LvDynamicFormComponent } from '../../../../shared/ui/organisms/dynamic-form/dynamic-form';
import { CompaniaService } from '../../../../core/services/compania/compania.service';
import { LvFormFieldConfig } from '../../../../shared/types/form-field.type';
import { SedeService } from '../../../../core/services/sede/sede.service';
import { Sede } from '../../../../core/models/sede.model';

@Component({
  selector: 'app-edit-sede',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    LvPageHeaderComponent,
    LvButtonComponent,
    LvDynamicFormComponent,
  ],
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class EditSede {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  private readonly service = inject(SedeService);
  private readonly companiaService = inject(CompaniaService);
  readonly companiaOptions = signal<
    { label: string; value: string }[]
  >([]);

  readonly loading = signal(true);

  readonly breadcrumb = signal([
    { label: 'Inicio', route: '/' },
    { label: 'Sedes', route: '/sedes' },
    { label: 'Editar' },
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

    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.companiaService.list().subscribe({
      next: (response) => {

        this.companiaOptions.set(
          response.data.map(compania => ({
            label: compania.nombre,
            value: String(compania.id),
          }))
        );

        this.service.show(id).subscribe({
          next: (sede: Sede) => {

            this.form.patchValue({
              compania_id: String(sede.compania_id),
              nombre: sede.nombre,
              codigo: sede.codigo,
              direccion: sede.direccion,
              telefono: sede.telefono ?? '',
              activo: sede.activo,
            });

            this.loading.set(false);

          },
          error: () => {
            this.router.navigate(['/sedes']);
          },
        });

      },
      error: () => {
        this.router.navigate(['/sedes']);
      },
    });

  }

  onSubmit(): void {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const id = Number(this.route.snapshot.paramMap.get('id'));

    const value = this.form.getRawValue();

    const payload: Partial<Sede> = {
      compania_id: Number(value.compania_id),
      nombre: value.nombre ?? '',
      codigo: value.codigo ?? '',
      direccion: value.direccion ?? '',
      telefono: value.telefono ?? undefined,
      activo: value.activo ?? true,
    };

    this.loading.set(true);

    this.service.update(id, payload).subscribe({
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
