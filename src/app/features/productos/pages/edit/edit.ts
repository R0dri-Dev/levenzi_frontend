import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Producto } from '../../../../core/models/producto.model';
import { ProductoService } from '../../../../core/services/productos/producto.service';
import { FamiliaService } from '../../../../core/services/familias/familia.service';

import { LvDynamicFormComponent } from '../../../../shared/ui/organisms/dynamic-form/dynamic-form';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import type { LvFormFieldConfig } from '../../../../shared/types/form-field.type';
import { LvButtonComponent } from '../../../../shared/ui/atoms';

@Component({
  selector: 'app-edit-producto',
  standalone: true,
  imports: [LvPageHeaderComponent, LvDynamicFormComponent, LvButtonComponent],
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class EditProducto {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(ProductoService);
  private readonly familiaService = inject(FamiliaService);

  readonly breadcrumb = signal([
    { label: 'Inicio', route: '/' },
    { label: 'Productos', route: '/productos' },
    { label: 'Editar producto' },
  ]);

  readonly loading = signal(false);

  readonly id = computed(() => {
    const raw = this.route.snapshot.paramMap.get('id');
    const parsed = raw ? Number(raw) : NaN;
    return parsed;
  });

  readonly familiaOptions = signal<{ label: string; value: string }[]>([]);

  readonly form = this.fb.nonNullable.group({
    familia_id: [''],
    codigo: [''],
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    descripcion: [''],
    precio: ['', [Validators.required]],
    activo: [true],
  });

  readonly fields = computed((): LvFormFieldConfig[] => [
    {
      key: 'nombre',
      label: 'Nombre',
      type: 'text',
      required: true,
      placeholder: 'Ej. Producto A',
    },
    {
      key: 'familia_id',
      label: 'Familia',
      type: 'select',
      required: false,
      placeholder: 'Selecciona una familia',
      options: this.familiaOptions(),
    },
    {
      key: 'codigo',
      label: 'Código',
      type: 'text',
      required: false,
      placeholder: 'Ej. PRD-001',
    },
    {
      key: 'precio',
      label: 'Precio',
      type: 'number',
      required: true,
      placeholder: 'Ej. 19.90',
    },
    {
      key: 'descripcion',
      label: 'Descripción',
      type: 'text',
      required: false,
      placeholder: 'Ej. Producto destacado',
    },
  ]);

  constructor() {
    this.loadFamilias();
    this.loadProducto();
  }

  private loadFamilias(): void {
    this.familiaService.list().subscribe({
      next: (response) => {
        this.familiaOptions.set(
          response.data.map((f) => ({
            label: f.nombre,
            value: String(f.id),
          })),
        );
      },
    });
  }

  private loadProducto(): void {
    const id = this.id();
    if (!Number.isFinite(id) || id <= 0) return;

    this.loading.set(true);
    this.service.getById(id).subscribe({
      next: (found) => {
        this.form.patchValue({
          familia_id: found.familia_id ? String(found.familia_id) : '',
          codigo: found.codigo ?? '',
          nombre: found.nombre ?? '',
          descripcion: found.descripcion ?? '',
          precio: String(found.precio ?? ''),
          activo: !!found.activo,
        });
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  onCancel(): void {
    void this.router.navigate(['/productos']);
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

    const payload: Partial<Producto> = {
      ...value,
      familia_id: value.familia_id ? Number(value.familia_id) : undefined,
      precio: String(Number(value.precio)),
      codigo: value.codigo || undefined,
      descripcion: value.descripcion || undefined,
      activo: !!value.activo,
    };

    this.service.update(id, payload).subscribe({
      next: () => {
        this.loading.set(false);
        void this.router.navigate(['/productos']);
      },
      error: () => {
        this.loading.set(false);
        void this.router.navigate(['/productos']);
      },
    });
  }
}
