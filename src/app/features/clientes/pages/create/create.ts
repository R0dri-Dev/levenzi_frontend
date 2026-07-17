import { Component, computed, inject, signal } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Cliente } from '../../../../core/models/cliente.model';
import { ClienteService } from '../../../../core/services/clientes/cliente.service';
import { SedeService } from '../../../../core/services/sede/sede.service';
import { TipoDocumentoService } from '../../../../core/services/tipo-documento/tipo-documento.service';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvDynamicFormComponent } from '../../../../shared/ui/organisms/dynamic-form/dynamic-form';
import { LvPageHeaderComponent } from '../../../../shared/ui/organisms/page-header/page-header';
import { LvFormFieldConfig } from '../../../../shared/types/form-field.type';
import { PaisService } from '../../../../core/services/pais/pais.service';
import { Pais } from '../../../../core/models/pais.model';
import { DecolectaService } from '../../../../core/services/documentos/decolecta.service';
import { LvDocumentLookupResult, LvDocumentoOption } from '../../../../shared/ui/organisms/document-field/document-field';

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
  private readonly tipoDocumentoService = inject(TipoDocumentoService);
  private readonly paisService = inject(PaisService);
  private readonly decolecta = inject(DecolectaService);
  readonly paises = signal<Pais[]>([]);

  readonly loading = signal(false);

  readonly breadcrumb = signal([
    { label: 'Inicio', route: '/' },
    { label: 'Clientes', route: '/clientes' },
    { label: 'Nuevo' },
  ]);

  readonly sedesOptions = signal<{ label: string; value: string }[]>([]);
  readonly tiposDocumentoOptions = signal<LvDocumentoOption[]>([]);

  readonly form = this.fb.nonNullable.group({
    sede_id: ['', Validators.required],
    distrito_id: ['', Validators.required],
    tipo_documento_id: ['', Validators.required],
    documento_numero: ['', Validators.required],
    nombre: ['', [Validators.required, Validators.minLength(2)]],
    direccion: ['', [Validators.required]],
    telefono: [''],
    pais_id: [''],
    email: ['', [Validators.email]],
    activo: [true],
  });

  onDocumentoResuelto({ result }: { key: string; result: LvDocumentLookupResult }): void {
    this.form.patchValue({
      nombre: result.nombreSugerido,
      ...(result.tipo === 'RUC' && result.direccionSugerida
        ? { direccion: result.direccionSugerida }
        : {}),
    });
  }
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
      key: 'nombre',
      label: 'Nombre',
      type: 'text',
      required: true,
      placeholder: 'Ej. Juan Pérez',
    },
    {
      key: 'distrito_id',
      label: 'Ubicación',
      type: 'location',
      required: true,
    },
    {
      key: 'tipo_documento_id',
      numeroKey: 'documento_numero',
      label: 'Tipo de documento',
      numeroLabel: 'Número de documento',
      type: 'document',
      required: false,
      numeroPlaceholder: 'Ej. 78451236',
      options: this.tiposDocumentoOptions(),
      lookup: true,
    },
    {
      key: 'direccion',
      label: 'Dirección',
      type: 'text',
      required: true,
      placeholder: 'Ej. Av. Principal 123',
    },
    {
      key: 'pais_id',
      numeroKey: 'telefono',
      label: 'Teléfono',
      type: 'phone',
      required: false,
      numeroPlaceholder: 'Ej. 987654321',
      paisesData: this.paises(),
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

    this.paisService.list().subscribe({
      next: (data) => {
        this.paises.set(data);
        const peru = data.find((p) => p.codigo_iso2 === 'PE');
        if (peru && !this.form.controls.pais_id.value) {
          this.form.patchValue({ pais_id: String(peru.id) });
        }
      },
    });

    this.tipoDocumentoService.list().subscribe({
      next: (tipos) => {
        this.tiposDocumentoOptions.set(
          tipos.map((tipo) => ({
            label: `${tipo.nombre} (${tipo.codigo})`,
            value: String(tipo.id),
            codigo: tipo.codigo,
          }))
        );
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

    this.loading.set(true);

    const value = this.form.getRawValue();

    const payload: Partial<Cliente> = {
      ...value,
      sede_id: Number(value.sede_id),
      distrito_id: Number(value.distrito_id),
      tipo_documento_id: value.tipo_documento_id ? Number(value.tipo_documento_id) : null,
      pais_id: value.pais_id ? Number(value.pais_id) : null,
      activo: value.activo ?? true,
    };

    this.service.create(payload).subscribe({
      next: () => this.router.navigate(['/clientes']),
      error: () => this.loading.set(false),
    });
  }
}
