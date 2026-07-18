import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { LvDynamicFormComponent } from '../../../../shared/ui/organisms/dynamic-form/dynamic-form';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import type { LvFormFieldConfig } from '../../../../shared/types/form-field.type';
import { LvButtonComponent } from '../../../../shared/ui/atoms';
import { TipoUnidadMedidaService } from '../../../../core/services/tipos-unidad-medida/tipos-unidad-medida.service';

@Component({
  selector: 'app-edit-tipo-unidad-medida',
  standalone: true,
  imports: [LvPageHeaderComponent, LvDynamicFormComponent, LvButtonComponent],
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class EditTipoUnidadMedida {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(TipoUnidadMedidaService);

  readonly breadcrumb = signal([
    { label: 'Inicio', route: '/' },
    { label: 'Tipos de unidad de medida', route: '/tipos-unidad-medida' },
    { label: 'Editar tipo' },
  ]);

  readonly loading = signal(false);

  readonly id = computed(() => {
    const raw = this.route.snapshot.paramMap.get('id');
    return raw ? Number(raw) : NaN;
  });

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

  constructor() {
    this.loadTipo();
  }

  private loadTipo(): void {
    const id = this.id();
    if (!Number.isFinite(id) || id <= 0) return;

    this.loading.set(true);
    this.service.getById(id).subscribe({
      next: (found) => {
        this.form.patchValue({
          nombre: found.nombre ?? '',
          descripcion: found.descripcion ?? '',
        });
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  onCancel(): void {
    void this.router.navigate(['/tipos-unidad-medida']);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const id = this.id();
    if (!Number.isFinite(id) || id <= 0) return;

    this.loading.set(true);
    const value = this.form.getRawValue();

    const payload = {
      ...value,
      descripcion: value.descripcion || undefined,
    };

    this.service.update(id, payload).subscribe({
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
