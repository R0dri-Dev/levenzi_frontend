import { Component, effect, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Cliente } from '../../../../core/models/cliente.model';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvInputComponent } from '../../../../shared/ui/atoms/input/input';
import { LvSelectComponent } from '../../../../shared/ui/atoms/select/select';
import { LvFormFieldComponent } from '../../../../shared/ui/molecules/form-field/form-field';

@Component({
  selector: 'app-edit-cliente',
  standalone: true,
  imports: [ReactiveFormsModule, LvInputComponent, LvSelectComponent, LvButtonComponent, LvFormFieldComponent],
  templateUrl: './edit.html',
  styleUrl: './edit.css',
})
export class EditCliente {
  readonly cliente = input<Cliente | null>(null);
  readonly submit = output<Partial<Cliente>>();
  readonly cancel = output<void>();

  form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      sede_id: ['', [Validators.required]],
      distrito_id: ['', [Validators.required]],
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      documento_tipo: [''],
      documento_numero: [''],
      direccion: ['', [Validators.required]],
      telefono: [''],
      email: ['', [Validators.email]],
      activo: [true],
    });

    effect(() => {
      const cliente = this.cliente();
      if (cliente) {
        queueMicrotask(() => {
          this.form.patchValue({
            sede_id: cliente.sede_id ?? '',
            distrito_id: cliente.distrito_id ?? '',
            nombre: cliente.nombre ?? '',
            documento_tipo: cliente.documento_tipo ?? '',
            documento_numero: cliente.documento_numero ?? '',
            direccion: cliente.direccion ?? '',
            telefono: cliente.telefono ?? '',
            email: cliente.email ?? '',
            activo: !!cliente.activo,
          }, { emitEvent: false });
        });
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.getRawValue();
    this.submit.emit({
      sede_id: Number(payload.sede_id),
      distrito_id: Number(payload.distrito_id),
      nombre: payload.nombre,
      documento_tipo: payload.documento_tipo || undefined,
      documento_numero: payload.documento_numero || undefined,
      direccion: payload.direccion,
      telefono: payload.telefono || undefined,
      email: payload.email || undefined,
      activo: payload.activo,
    });
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
