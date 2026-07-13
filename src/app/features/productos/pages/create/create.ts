import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ProductoService } from '../../../../core/services/productos/producto.service';
import { MarcaService } from '../../../../core/services/marcas/marca.service';
import { InstalacionService } from '../../../../core/services/instalaciones/instalacion.service';


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
  private readonly marcaService = inject(MarcaService);
  private readonly instalacionService = inject(InstalacionService);

  readonly breadcrumb = signal([

    { label: 'Inicio', route: '/' },
    { label: 'Productos', route: '/productos' },
    { label: 'Nuevo producto' },
  ]);

  readonly loading = signal(false);

  readonly marcaOptions = signal<{ label: string; value: string }[]>([]);
  readonly instalacionOptions = signal<{ label: string; value: string }[]>([]);

  private readonly _instalacionLoaded = signal(false);


  readonly form = this.fb.nonNullable.group({
    marca_id: ['', Validators.required],
    instalacion_id: ['', Validators.required],

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
      key: 'marca_id',
      label: 'Marca',
      type: 'select',
      required: true,
      placeholder: 'Selecciona una marca',
      options: this.marcaOptions(),
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
    this.loadMarcas();
    this.loadInstalaciones();
  }

  private loadInstalaciones(): void {
    if (this._instalacionLoaded()) return;
    this._instalacionLoaded.set(true);

    this.instalacionService.list().subscribe({
      next: (response) => {
        this.instalacionOptions.set(
          response.data.map((i) => ({
            label: i.nombre,
            value: String(i.id),
          }))
        );
      },
    });
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

    // LvDynamicForm trabaja con strings en el form; convertimos antes de enviar.
    const payload = {
      ...value,
      marca_id: Number(value.marca_id),
      instalacion_id: Number(value.instalacion_id),
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

