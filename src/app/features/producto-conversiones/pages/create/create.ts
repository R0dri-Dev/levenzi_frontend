import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ProductoService } from '../../../../core/services/productos/producto.service';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDynamicFormComponent } from '../../../../shared/ui/organisms/dynamic-form/dynamic-form';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import type { LvFormFieldConfig } from '../../../../shared/types/form-field.type';
import {
  ProductoConversionService
} from '../../../../core/services/producto-conversiones/producto-conversiones.service';
import { UnidadMedidaService } from '../../../../core/services/unidades-medida/unidades-medida.service';

@Component({
  selector: 'app-create-producto-conversion',
  standalone: true,
  imports: [LvPageHeaderComponent, LvButtonComponent, LvDynamicFormComponent],
  templateUrl: './create.html',
  styleUrl: './create.css',
})
export class CreateProductoConversion {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly service = inject(ProductoConversionService);
  private readonly productoService = inject(ProductoService);
  private readonly unidadService = inject(UnidadMedidaService);

  readonly breadcrumb = signal([
    { label: 'Inicio', route: '/' },
    { label: 'Conversiones de producto', route: '/producto-conversiones' },
    { label: 'Nueva conversión' },
  ]);

  readonly loading = signal(false);
  readonly productoOptions = signal<{ label: string; value: string }[]>([]);
  readonly unidadOptions = signal<{ label: string; value: string }[]>([]);

  readonly form = this.fb.nonNullable.group({
    producto_id: ['', Validators.required],
    unidad_medida_origen_id: ['', Validators.required],
    unidad_medida_destino_id: ['', Validators.required],
    factor_conversion: ['', Validators.required],
  });

  readonly fields = computed((): LvFormFieldConfig[] => [
    {
      key: 'producto_id',
      label: 'Producto',
      type: 'select',
      required: true,
      placeholder: 'Selecciona un producto',
      options: this.productoOptions(),
    },
    {
      key: 'unidad_medida_origen_id',
      label: 'Unidad de origen',
      type: 'select',
      required: true,
      placeholder: 'Selecciona la unidad de origen',
      options: this.unidadOptions(),
    },
    {
      key: 'unidad_medida_destino_id',
      label: 'Unidad de destino',
      type: 'select',
      required: true,
      placeholder: 'Selecciona la unidad de destino',
      options: this.unidadOptions(),
    },
    {
      key: 'factor_conversion',
      label: 'Factor de conversión',
      type: 'number',
      required: true,
      placeholder: 'Ej. 1000',
    },
  ]);

  constructor() {
    this.loadProductos();
    this.loadUnidades();
  }

  private loadProductos(): void {
    this.productoService.list().subscribe({
      next: (response) => {
        this.productoOptions.set(
          response.data.map((p) => ({
            label: p.nombre,
            value: String(p.id),
          })),
        );
      },
    });
  }

  private loadUnidades(): void {
    this.unidadService.list().subscribe({
      next: (response) => {
        this.unidadOptions.set(
          response.data.map((u) => ({
            label: `${u.nombre} (${u.simbolo})`,
            value: String(u.id),
          })),
        );
      },
    });
  }

  onCancel(): void {
    void this.router.navigate(['/producto-conversiones']);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    const value = this.form.getRawValue();

    const payload = {
      producto_id: Number(value.producto_id),
      unidad_medida_origen_id: Number(value.unidad_medida_origen_id),
      unidad_medida_destino_id: Number(value.unidad_medida_destino_id),
      factor_conversion: String(Number(value.factor_conversion)),
      activo: true,
    };

    this.service.create(payload).subscribe({
      next: () => {
        this.loading.set(false);
        void this.router.navigate(['/producto-conversiones']);
      },
      error: () => {
        this.loading.set(false);
        void this.router.navigate(['/producto-conversiones']);
      },
    });
  }
}
