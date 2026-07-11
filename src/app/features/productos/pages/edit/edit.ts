import { Component, effect, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Producto } from '../../../../core/models/producto.model';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvInputComponent } from '../../../../shared/ui/atoms/input/input';
import { LvSelectComponent } from '../../../../shared/ui/atoms/select/select';
import { LvFormFieldComponent } from '../../../../shared/ui/molecules/form-field/form-field';

@Component({
    selector: 'app-edit-producto',
    standalone: true,
    imports: [ReactiveFormsModule, LvInputComponent, LvSelectComponent, LvButtonComponent, LvFormFieldComponent],
    templateUrl: './edit.html',
    styleUrl: './edit.css',
})
export class EditProducto {
    readonly producto = input<Producto | null>(null);
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
            activo: [true],
        });

        effect(() => {
            const producto = this.producto();
            if (producto) {
                queueMicrotask(() => {
                    this.form.patchValue({
                        marca_id: producto.marca_id ?? '',
                        codigo: producto.codigo ?? '',
                        nombre: producto.nombre ?? '',
                        descripcion: producto.descripcion ?? '',
                        precio: producto.precio ?? '',
                        activo: !!producto.activo,
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
            marca_id: Number(payload.marca_id),
            codigo: payload.codigo || undefined,
            nombre: payload.nombre,
            descripcion: payload.descripcion || undefined,
            precio: payload.precio,
            activo: payload.activo,
        });
    }

    onCancel(): void {
        this.cancel.emit();
    }
}
