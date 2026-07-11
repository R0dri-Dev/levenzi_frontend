import { Component, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Producto } from '../../../../core/models/producto.model';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvInputComponent } from '../../../../shared/ui/atoms/input/input';
import { LvSelectComponent } from '../../../../shared/ui/atoms/select/select';
import { LvFormFieldComponent } from '../../../../shared/ui/molecules/form-field/form-field';

@Component({
    selector: 'app-create-producto',
    standalone: true,
    imports: [ReactiveFormsModule, LvInputComponent, LvSelectComponent, LvButtonComponent, LvFormFieldComponent],
    templateUrl: './create.html',
    styleUrl: './create.css',
})
export class CreateProducto {
    readonly submit = output<Partial<Producto>>();
    readonly cancel = output<void>();

    form: FormGroup;

    constructor(private readonly fb: FormBuilder) {
        this.form = this.fb.group({
            marca_id: ['', [Validators.required]],
            codigo: [''],
            nombre: ['', [Validators.required, Validators.minLength(2)]],
            descripcion: [''],
            precio: ['', [Validators.required]],
        });
    }

    onSubmit(): void {
        if (this.form.invalid) {
            this.form.markAllAsTouched();
            return;
        }

        const payload = this.form.getRawValue();
        this.submit.emit({
            marca_id: Number(payload.marca_id),
            codigo: payload.codigo || undefined,
            nombre: payload.nombre,
            descripcion: payload.descripcion || undefined,
            precio: payload.precio,
            activo: true,
        });
        this.form.reset({ marca_id: '', codigo: '', nombre: '', descripcion: '', precio: '' });
    }

    onCancel(): void {
        this.cancel.emit();
    }
}
