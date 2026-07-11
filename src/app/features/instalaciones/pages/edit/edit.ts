import { Component, effect, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Instalacion } from '../../../../core/models/instalacion.model';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvInputComponent } from '../../../../shared/ui/atoms/input/input';
import { LvSelectComponent } from '../../../../shared/ui/atoms/select/select';
import { LvFormFieldComponent } from '../../../../shared/ui/molecules/form-field/form-field';

@Component({
    selector: 'app-edit-instalacion',
    standalone: true,
    imports: [ReactiveFormsModule, LvInputComponent, LvSelectComponent, LvButtonComponent, LvFormFieldComponent],
    templateUrl: './edit.html',
    styleUrl: './edit.css',
})
export class EditInstalacion {
    readonly instalacion = input<Instalacion | null>(null);
    readonly submit = output<Partial<Instalacion>>();
    readonly cancel = output<void>();

    form: FormGroup;

    constructor(private readonly fb: FormBuilder) {
        this.form = this.fb.group({
            sede_id: ['', [Validators.required]],
            nombre: ['', [Validators.required, Validators.minLength(2)]],
            tipo: [''],
            activo: [true],
        });

        effect(() => {
            const instalacion = this.instalacion();
            if (instalacion) {
                queueMicrotask(() => {
                    this.form.patchValue({
                        sede_id: instalacion.sede_id ?? '',
                        nombre: instalacion.nombre ?? '',
                        tipo: instalacion.tipo ?? '',
                        activo: !!instalacion.activo,
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
            nombre: payload.nombre,
            tipo: payload.tipo || undefined,
            activo: payload.activo,
        });
    }

    onCancel(): void {
        this.cancel.emit();
    }
}
