import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { Cliente } from '../../../../core/models/cliente.model';
import { ClienteService } from '../../../../core/services/clientes/cliente.service';
import { SedeService } from '../../../../core/services/sede/sede.service';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDynamicFormComponent } from '../../../../shared/ui/organisms/dynamic-form/dynamic-form';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import { LvFormFieldConfig } from '../../../../shared/types/form-field.type';

@Component({
  selector: 'app-create-cliente',
  standalone: true,
  imports: [ReactiveFormsModule, LvPageHeaderComponent, LvDynamicFormComponent, LvButtonComponent],
  templateUrl: './create.html',
  styleUrl: './create.css',
})
export class CreateCliente {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly service = inject(ClienteService);
  private readonly sedeService = inject(SedeService);

  readonly loading = signal(false);

  readonly breadcrumb = signal([
    { label: 'Inicio', route: '/' },
    { label: 'Clientes', route: '/clientes' },
    { label: 'Nuevo' },
  ]);

  readonly sedesOptions = signal<{ label: string; value: string }[]>([]);

  readonly form = this.fb.nonNullable.group({
    sede_id: ['', Validators.required],
    distrito_id: ['', Validators.required],
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    documento_tipo: [''],
    documento_numero: [''],
    direccion: ['', [Validators.required]],
    telefono: [''],
    email: ['', [Validators.email]],
    activo: [true],
  });

  readonly fields = computed<LvFormFieldConfig[]>(() => [
    {
      key: 'sede_id',
      label: 'Sede',
      type: 'select',
      required: true,
      placeholder: 'Seleccione una sede',
      options: this.sedesOptions(),
    },
    {
      key: 'distrito_id',
      label: 'Distrito',
      type: 'number',
      required: true,
      placeholder: 'Ingrese el distrito',
    },
    {
      key: 'nombre',
      label: 'Nombre',
      type: 'text',
      required: true,
      placeholder: 'Ej. Juan Pérez',
    },
    {
      key: 'documento_tipo',
      label: 'Documento tipo',
      type: 'text',
      required: false,
      placeholder: 'Ej. DNI',
    },
    {
      key: 'documento_numero',
      label: 'Documento número',
      type: 'text',
      required: false,
      placeholder: 'Ej. 78451236',
    },
    {
      key: 'direccion',
      label: 'Dirección',
      type: 'text',
      required: true,
      placeholder: 'Ej. Av. Principal 123',
    },
    {
      key: 'telefono',
      label: 'Teléfono',
      type: 'text',
      required: false,
      placeholder: '987654321',
    },
    {
      key: 'email',
      label: 'Correo',
      type: 'email',
      required: false,
      placeholder: 'cliente@mail.com',
    },
  ]);

  constructor() {
    this.sedeService.list().subscribe({
      next: (response) => {
        this.sedesOptions.set(
          response.data.map((sede) => ({
            label: sede.nombre,
            value: String(sede.id),
          }))
        );
      },
      error: () => this.loading.set(false),
      complete: () => this.loading.set(false),
    });
  }


  onCancel(): void {
    this.router.navigate(['/clientes']);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);

    const value = this.form.getRawValue();

    const payload: Partial<Cliente> = {
      ...value,
      sede_id: Number(value.sede_id),
      distrito_id: Number(value.distrito_id),
      activo: value.activo ?? true,
    };

    this.service.create(payload).subscribe({
      next: () => this.router.navigate(['/clientes']),
      error: () => this.loading.set(false),
    });
  }
}

