import { Component, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvInputComponent } from '../../../../shared/ui/atoms/input/input';
import { LvFormFieldComponent } from '../../../../shared/ui/molecules/form-field/form-field';
import { Compania } from '../../../../core/models/compania.model';

@Component({
    selector: 'app-create-compania',
    standalone: true,
    imports: [ReactiveFormsModule, LvInputComponent, LvButtonComponent, LvFormFieldComponent],
    templateUrl: './create.html',
    styleUrl: './create.css',
})
export class CreateCompania {
    readonly submit = output<Partial<Compania>>();
    readonly cancel = output<void>();

    form: FormGroup;

    constructor(private readonly fb: FormBuilder) {
        this.form = this.fb.group({
            nombre: ['', [Validators.required, Validators.minLength(2)]],
            ruc: ['', [Validators.required]],
            direccion: ['', [Validators.required]],
            telefono: [''],
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
            nombre: payload.nombre,
            ruc: payload.ruc,
            direccion: payload.direccion,
            telefono: payload.telefono || undefined,
            activo: payload.activo,
        });
        this.form.reset({ nombre: '', ruc: '', direccion: '', telefono: '', activo: true });
    }

    onCancel(): void {
        this.cancel.emit();
    }
}
