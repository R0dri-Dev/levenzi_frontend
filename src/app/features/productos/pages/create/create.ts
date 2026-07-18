import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ProductoService } from '../../../../core/services/productos/producto.service';
import { FamiliaService } from '../../../../core/services/familias/familia.service';

import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDynamicFormComponent } from '../../../../shared/ui/organisms/dynamic-form/dynamic-form';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import type { LvFormFieldConfig } from '../../../../shared/types/form-field.type';

@Component({
  selector: 'app-create-producto',
  standalone: true,
  imports: [LvPageHeaderComponent, LvButtonComponent, LvDynamicFormComponent],
  templateUrl: './create.html',
  styleUrl: './create.css',
})
export class CreateProducto {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly service = inject(ProductoService);
  private readonly familiaService = inject(FamiliaService);

  readonly breadcrumb = signal([
    { label: 'Inicio', route: '/' },
    { label: 'Productos', route: '/productos' },
    { label: 'Nuevo producto' },
  ]);

  readonly loading = signal(false);
  readonly familiaOptions = signal<{ label: string; value: string }[]>([]);

  readonly form = this.fb.nonNullable.group({
    familia_id: [''],
    codigo: [''],
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    descripcion: [''],
    precio: ['', [Validators.required]],
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

  onCancel(): void {
    void this.router.navigate(['/productos']);
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
      familia_id: value.familia_id ? Number(value.familia_id) : undefined,
      precio: String(Number(value.precio)),
      codigo: value.codigo || undefined,
      descripcion: value.descripcion || undefined,
      activo: true,
    };

    this.service.create(payload).subscribe({
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
