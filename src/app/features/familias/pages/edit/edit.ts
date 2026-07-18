import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { FamiliaService } from '../../../../core/services/familias/familia.service';
import { LvDynamicFormComponent } from '../../../../shared/ui/organisms/dynamic-form/dynamic-form';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import type { LvFormFieldConfig } from '../../../../shared/types/form-field.type';
import { LvButtonComponent } from '../../../../shared/ui/atoms';
import { Familia } from '../../../../core/models/familia-model';

@Component({
  selector: 'app-edit-familia',
  standalone: true,
  imports: [LvPageHeaderComponent, LvDynamicFormComponent, LvButtonComponent],
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class EditFamilia {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(FamiliaService);

  readonly breadcrumb = signal([
    { label: 'Inicio', route: '/' },
    { label: 'Familias', route: '/familias' },
    { label: 'Editar familia' },
  ]);

  readonly loading = signal(false);

  readonly id = computed(() => {
    const raw = this.route.snapshot.paramMap.get('id');
    return raw ? Number(raw) : NaN;
  });

  readonly familiaOptions = signal<{ label: string; value: string }[]>([]);

  readonly form = this.fb.nonNullable.group({
    familia_padre_id: [''],
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    descripcion: [''],
    activo: [true],
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
    this.loadFamilia();
  }

  private loadFamilias(): void {
    this.service.list().subscribe({
      next: (response) => {
        const id = this.id();
        // Evita que la familia se pueda seleccionar a sí misma como padre
        this.familiaOptions.set(
          response.data
            .filter((f) => f.id !== id)
            .map((f) => ({
              label: f.nombre,
              value: String(f.id),
            }))
        );
      },
    });
  }

  private loadFamilia(): void {
    const id = this.id();
    if (!Number.isFinite(id) || id <= 0) return;

    this.loading.set(true);
    this.service.getById(id).subscribe({
      next: (found) => {
        this.form.patchValue({
          familia_padre_id: found.familia_padre_id ? String(found.familia_padre_id) : '',
          nombre: found.nombre ?? '',
          descripcion: found.descripcion ?? '',
          activo: !!found.activo,
        });
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
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

    const id = this.id();
    if (!Number.isFinite(id) || id <= 0) return;

    this.loading.set(true);
    const value = this.form.getRawValue();

    const payload: Partial<Familia> = {
      familia_padre_id: value.familia_padre_id ? Number(value.familia_padre_id) : undefined,
      nombre: value.nombre,
      descripcion: value.descripcion || undefined,
      activo: !!value.activo,
    };

    this.service.update(id, payload).subscribe({
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
