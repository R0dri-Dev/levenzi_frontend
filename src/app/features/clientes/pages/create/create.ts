import { Component, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Cliente } from '../../../../core/models/cliente.model';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvInputComponent } from '../../../../shared/ui/atoms/input/input';
import { LvSelectComponent } from '../../../../shared/ui/atoms/select/select';
import { LvFormFieldComponent } from '../../../../shared/ui/molecules/form-field/form-field';

@Component({
    selector: 'app-create-cliente',
    standalone: true,
    imports: [ReactiveFormsModule, LvInputComponent, LvSelectComponent, LvButtonComponent, LvFormFieldComponent],
    templateUrl: './create.html',
    styleUrl: './create.css',
})
export class CreateCliente {
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
            activo: true,
        });
        this.form.reset({
            sede_id: '',
            distrito_id: '',
            nombre: '',
            documento_tipo: '',
            documento_numero: '',
            direccion: '',
            telefono: '',
            email: '',
        });
    }

    onCancel(): void {
        this.cancel.emit();
    }
}
