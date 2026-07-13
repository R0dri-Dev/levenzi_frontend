import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Producto } from '../../../../core/models/producto.model';
import { ProductoService } from '../../../../core/services/productos/producto.service';
import { MarcaService } from '../../../../core/services/marcas/marca.service';

import { LvDynamicFormComponent } from '../../../../shared/ui/organisms/dynamic-form/dynamic-form';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import { InstalacionService } from '../../../../core/services/instalaciones/instalacion.service';

import type { LvFormFieldConfig } from '../../../../shared/types/form-field.type';
import { LvButtonComponent } from "../../../../shared/ui/atoms";

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
  private readonly marcaService = inject(MarcaService);
  private readonly instalacionService = inject(InstalacionService);

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

  readonly marcaOptions = signal<{ label: string; value: string }[]>([]);
  readonly instalacionOptions = signal<{ label: string; value: string }[]>([]);

  readonly form = this.fb.nonNullable.group({
    marca_id: ['', Validators.required],
    instalacion_id: ['', Validators.required],
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
      key: 'marca_id',
      label: 'Marca',
      type: 'select',
      required: true,
      placeholder: 'Selecciona una marca',
      options: this.marcaOptions(),
    },
    {
      key: 'codigo',
      label: 'Código',
      type: 'text',
      required: false,
      placeholder: 'Ej. PRD-001',
    },
    {
      key: 'instalacion_id',
      label: 'Instalación',
      type: 'select',
      required: true,
      placeholder: 'Selecciona una instalación',
      options: this.instalacionOptions(),
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
    this.loadMarcas();
    this.loadProducto();
    this.loadInstalacion();
  }

  private loadMarcas(): void {
    this.marcaService.list().subscribe({
      next: (response) => {
        this.marcaOptions.set(
          response.data.map((m) => ({
            label: m.nombre,
            value: String(m.id),
          }))
        );
      },
    });
  }

  private loadInstalacion(): void {
    this.instalacionService.list().subscribe({
      next: (response) => {
        this.instalacionOptions.set(
          response.data.map((i) => ({
            label: i.nombre,
            value: String(i.id),
          }))
        );
      }
    })
  }

  private loadProducto(): void {
    const id = this.id();
    if (!Number.isFinite(id) || id <= 0) return;

    this.loading.set(true);
    this.service.list(1).subscribe({
      next: (response) => {
        const found = response.data.find((p) => p.id === id) ?? null;
        if (found) {
          this.form.patchValue({
            marca_id: String(found.marca_id ?? ''),
            instalacion_id: String(found.instalacion_id ?? ''),
            codigo: found.codigo ?? '',
            nombre: found.nombre ?? '',
            descripcion: found.descripcion ?? '',
            precio: String(found.precio ?? ''),
            activo: !!found.activo,
          });
        }
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
      marca_id: Number(value.marca_id),
      instalacion_id: Number(value.instalacion_id),
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

