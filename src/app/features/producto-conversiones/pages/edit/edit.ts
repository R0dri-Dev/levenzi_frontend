import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { ProductoConversion } from '../../../../core/models/producto-conversion.model';
import { ProductoService } from '../../../../core/services/productos/producto.service';
import { LvDynamicFormComponent } from '../../../../shared/ui/organisms/dynamic-form/dynamic-form';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import type { LvFormFieldConfig } from '../../../../shared/types/form-field.type';
import { LvButtonComponent } from '../../../../shared/ui/atoms';
import {
  ProductoConversionService
} from '../../../../core/services/producto-conversiones/producto-conversiones.service';
import { UnidadMedidaService } from '../../../../core/services/unidades-medida/unidades-medida.service';

@Component({
  selector: 'app-edit-producto-conversion',
  standalone: true,
  imports: [LvPageHeaderComponent, LvDynamicFormComponent, LvButtonComponent],
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class EditProductoConversion {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly service = inject(ProductoConversionService);
  private readonly productoService = inject(ProductoService);
  private readonly unidadService = inject(UnidadMedidaService);

  readonly breadcrumb = signal([
    { label: 'Inicio', route: '/' },
    { label: 'Conversiones de producto', route: '/producto-conversiones' },
    { label: 'Editar conversión' },
  ]);

  readonly loading = signal(false);

  readonly id = computed(() => {
    const raw = this.route.snapshot.paramMap.get('id');
    return raw ? Number(raw) : NaN;
  });

  readonly productoOptions = signal<{ label: string; value: string }[]>([]);
  readonly unidadOptions = signal<{ label: string; value: string }[]>([]);

  readonly form = this.fb.nonNullable.group({
    producto_id: ['', Validators.required],
    unidad_medida_origen_id: ['', Validators.required],
    unidad_medida_destino_id: ['', Validators.required],
    factor_conversion: ['', Validators.required],
    activo: [true],
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
    this.loadConversion();
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

  private loadConversion(): void {
    const id = this.id();
    if (!Number.isFinite(id) || id <= 0) return;

    this.loading.set(true);
    this.service.getById(id).subscribe({
      next: (found) => {
        this.form.patchValue({
          producto_id: String(found.producto_id ?? ''),
          unidad_medida_origen_id: String(found.unidad_medida_origen_id ?? ''),
          unidad_medida_destino_id: String(found.unidad_medida_destino_id ?? ''),
          factor_conversion: String(found.factor_conversion ?? ''),
          activo: !!found.activo,
        });
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
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

    const id = this.id();
    if (!Number.isFinite(id) || id <= 0) return;

    this.loading.set(true);
    const value = this.form.getRawValue();

    const payload: Partial<ProductoConversion> = {
      producto_id: Number(value.producto_id),
      unidad_medida_origen_id: Number(value.unidad_medida_origen_id),
      unidad_medida_destino_id: Number(value.unidad_medida_destino_id),
      factor_conversion: String(Number(value.factor_conversion)),
      activo: !!value.activo,
    };

    this.service.update(id, payload).subscribe({
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
