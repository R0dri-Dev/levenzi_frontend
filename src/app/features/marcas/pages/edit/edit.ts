import { Component, computed, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import type { LvFormFieldConfig } from '../../../../shared/types/form-field.type';

import { Marca } from '../../../../core/models/marca.model';
import { MarcaService } from '../../../../core/services/marcas/marca.service';

import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import { LvDynamicFormComponent } from '../../../../shared/ui/organisms/dynamic-form/dynamic-form';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-marca',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LvPageHeaderComponent, LvButtonComponent, LvDynamicFormComponent],
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class EditMarca {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(MarcaService);

  readonly breadcrumb = signal([
    { label: 'Inicio', route: '/' },
    { label: 'Marcas', route: '/marcas' },
    { label: 'Editar marca' },
  ]);

  readonly loading = signal(true);

  readonly id = computed(() => Number(this.route.snapshot.paramMap.get('id') ?? 0));

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
        this.form.patchValue({
          nombre: marca.nombre ?? '',
          codigo: marca.codigo ?? '',
          descripcion: marca.descripcion ?? '',
          activo: !!marca.activo,
        });
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  onCancel(): void {
    void this.router.navigateByUrl('/marcas');
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const value = this.form.getRawValue();

    const payload: Partial<Marca> = {
      nombre: value.nombre,
      codigo: value.codigo || undefined,
      descripcion: value.descripcion || undefined,
      activo: value.activo,
    };

    const id = this.id();
    this.loading.set(true);
    this.service.update(id, payload).subscribe({
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

