import { Component, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvInputComponent } from '../../../../shared/ui/atoms/input/input';
import { LvFormFieldComponent } from '../../../../shared/ui/molecules/form-field/form-field';
import { Sede } from '../../../../core/models/sede.model';

@Component({
    selector: 'app-create-sede',
    standalone: true,
    imports: [ReactiveFormsModule, LvInputComponent, LvButtonComponent, LvFormFieldComponent],
    templateUrl: './create.html',
    styleUrl: './create.css',
})
export class CreateSede {
    readonly submit = output<Partial<Sede>>();
    readonly cancel = output<void>();

    form: FormGroup;

    constructor(private readonly fb: FormBuilder) {
        this.form = this.fb.group({
            compania_id: ['', [Validators.required]],
            nombre: ['', [Validators.required, Validators.minLength(2)]],
            codigo: ['', [Validators.required]],
            direccion: ['', [Validators.required]],
            telefono: [''],
            email: ['', [Validators.email]],
            activo: [true],
        });
    }

    onSubmit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const payload = this.form.getRawValue();
        this.submit.emit({
            compania_id: Number(payload.compania_id),
            nombre: payload.nombre,
            codigo: payload.codigo,
            direccion: payload.direccion,
            telefono: payload.telefono || undefined,
            email: payload.email || undefined,
            activo: payload.activo,
        });
        this.form.reset({ compania_id: '', nombre: '', codigo: '', direccion: '', telefono: '', email: '', activo: true });
    }

    onCancel(): void {
        this.cancel.emit();
    }
}
