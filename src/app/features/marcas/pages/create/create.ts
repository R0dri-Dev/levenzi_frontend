import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Marca } from '../../../../core/models/marca.model';
import { MarcaService } from '../../../../core/services/marcas/marca.service';
import { LvDynamicFormComponent } from '../../../../shared/ui/organisms/dynamic-form/dynamic-form';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvFormFieldConfig } from '../../../../shared/types/form-field.type';

@Component({
  selector: 'app-create-marca',
  standalone: true,
  imports: [ReactiveFormsModule, LvPageHeaderComponent, LvButtonComponent, LvDynamicFormComponent],
  templateUrl: './create.html',
  styleUrl: './create.css',
})
export class CreateMarca {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly service = inject(MarcaService);

  readonly breadcrumb = signal([
    { label: 'Inicio', route: '/' },
    { label: 'Marcas', route: '/marcas' },
    { label: 'Nuevo marca' },
  ]);

  readonly loading = signal(false);

  readonly form = this.fb.nonNullable.group({
    nombre: ['', Validators.required],
    codigo: [''],
    descripcion: [''],
    activo: [true],
  });

  readonly fields = computed<LvFormFieldConfig[]>(() => [
    {
      key: 'nombre',
      label: 'Nombre',
      type: 'text',
      required: true,
      placeholder: 'Ej. Marca X',
    },
    {
      key: 'codigo',
      label: 'Código',
      type: 'text',
      required: false,
      placeholder: 'Ej. MX01',
    },
    {
      key: 'descripcion',
      label: 'Descripción',
      type: 'text',
      required: false,
      placeholder: 'Ej. Marca líder del mercado',
    },
  ]);

  onCancel(): void {
    void this.router.navigateByUrl('/marcas');
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const formValue = this.form.getRawValue();

    const payload: Partial<Marca> = {
      nombre: formValue.nombre,
      codigo: formValue.codigo || undefined,
      descripcion: formValue.descripcion || undefined,
      activo: true,
    };

    this.loading.set(true);
    this.service.create(payload).subscribe({
      next: () => {
        this.loading.set(false);
        void this.router.navigateByUrl('/marcas');
      },
      error: () => {
        this.loading.set(false);
        void this.router.navigateByUrl('/marcas');
      },
    });
  }
}

