import { Component, effect, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Marca } from '../../../../core/models/marca.model';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvInputComponent } from '../../../../shared/ui/atoms/input/input';
import { LvFormFieldComponent } from '../../../../shared/ui/molecules/form-field/form-field';

@Component({
    selector: 'app-edit-marca',
    standalone: true,
    imports: [ReactiveFormsModule, LvInputComponent, LvButtonComponent, LvFormFieldComponent],
    templateUrl: './edit.html',
    styleUrl: './edit.css',
})
export class EditMarca {
    readonly marca = input<Marca | null>(null);
    readonly submit = output<Partial<Marca>>();
    readonly cancel = output<void>();

    form: FormGroup;

    constructor(private readonly fb: FormBuilder) {
        this.form = this.fb.group({
            nombre: ['', [Validators.required, Validators.minLength(2)]],
            codigo: [''],
            descripcion: [''],
            activo: [true],
        });

        effect(() => {
            const marca = this.marca();
            if (marca) {
                queueMicrotask(() => {
                    this.form.patchValue({
                        nombre: marca.nombre ?? '',
                        codigo: marca.codigo ?? '',
                        descripcion: marca.descripcion ?? '',
                        activo: !!marca.activo,
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
            nombre: payload.nombre,
            codigo: payload.codigo || undefined,
            descripcion: payload.descripcion || undefined,
            activo: payload.activo,
        });
    }

    onCancel(): void {
        this.cancel.emit();
    }
}
