import { Component, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Marca } from '../../../../core/models/marca.model';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvInputComponent } from '../../../../shared/ui/atoms/input/input';
import { LvFormFieldComponent } from '../../../../shared/ui/molecules/form-field/form-field';

@Component({
    selector: 'app-create-marca',
    standalone: true,
    imports: [ReactiveFormsModule, LvInputComponent, LvButtonComponent, LvFormFieldComponent],
    templateUrl: './create.html',
    styleUrl: './create.css',
})
export class CreateMarca {
    readonly submit = output<Partial<Marca>>();
    readonly cancel = output<void>();

    form: FormGroup;

    constructor(private readonly fb: FormBuilder) {
        this.form = this.fb.group({
            nombre: ['', [Validators.required, Validators.minLength(2)]],
            codigo: [''],
            descripcion: [''],
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
            codigo: payload.codigo || undefined,
            descripcion: payload.descripcion || undefined,
            activo: true,
        });
        this.form.reset({ nombre: '', codigo: '', descripcion: '' });
    }

    onCancel(): void {
        this.cancel.emit();
    }
}
