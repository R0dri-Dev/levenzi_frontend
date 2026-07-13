import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Cliente } from '../../../../core/models/cliente.model';
import { ClienteService } from '../../../../core/services/clientes/cliente.service';
import { SedeService } from '../../../../core/services/sede/sede.service';
import { LvDynamicFormComponent } from '../../../../shared/ui/organisms/dynamic-form/dynamic-form';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvFormFieldConfig } from '../../../../shared/types/form-field.type';

@Component({
  selector: 'app-edit-cliente',
  standalone: true,
  imports: [ReactiveFormsModule, LvPageHeaderComponent, LvDynamicFormComponent, LvButtonComponent],
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class EditCliente {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  private readonly service = inject(ClienteService);
  private readonly sedeService = inject(SedeService);

  readonly loading = signal(true);

  readonly breadcrumb = signal([
    { label: 'Inicio', route: '/' },
    { label: 'Clientes', route: '/clientes' },
    { label: 'Editar' },
  ]);

  readonly sedesOptions = signal<{ label: string; value: string }[]>([]);

  private readonly clienteId = computed(() => {
    const id = this.route.snapshot.paramMap.get('id');
    return id ? Number(id) : null;
  });

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
    });

    const id = this.clienteId();
    if (!id) {
      this.router.navigate(['/clientes']);
      return;
    }

    this.service.show(id).subscribe({
      next: (cliente: Cliente) => {
        this.form.patchValue({
          sede_id: String(cliente.sede_id ?? ''),
          distrito_id: String(cliente.distrito_id ?? ''),
          nombre: cliente.nombre ?? '',
          documento_tipo: cliente.documento_tipo ?? '',
          documento_numero: cliente.documento_numero ?? '',
          direccion: cliente.direccion ?? '',
          telefono: cliente.telefono ?? '',
          email: cliente.email ?? '',
          activo: !!cliente.activo,
        });
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.router.navigate(['/clientes']);
      },
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

    const id = this.clienteId();
    if (!id) {
      this.router.navigate(['/clientes']);
      return;
    }

    const value = this.form.getRawValue();

    const payload: Partial<Cliente> = {
      ...value,
      sede_id: Number(value.sede_id),
      distrito_id: Number(value.distrito_id),
      activo: value.activo ?? true,
    };

    this.loading.set(true);

    this.service.update(id, payload).subscribe({
      next: () => this.router.navigate(['/clientes']),
      error: () => this.loading.set(false),
    });
  }
}


