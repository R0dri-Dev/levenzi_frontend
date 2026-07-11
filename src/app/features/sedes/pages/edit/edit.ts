import { Component, effect, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvInputComponent } from '../../../../shared/ui/atoms/input/input';
import { LvSelectComponent } from '../../../../shared/ui/atoms/select/select';
import { LvFormFieldComponent } from '../../../../shared/ui/molecules/form-field/form-field';
import { Sede } from '../../../../core/models/sede.model';

@Component({
    selector: 'app-edit-sede',
    standalone: true,
    imports: [ReactiveFormsModule, LvInputComponent, LvSelectComponent, LvButtonComponent, LvFormFieldComponent],
    templateUrl: './edit.html',
    styleUrl: './edit.css',
})
export class EditSede {
    readonly sede = input<Sede | null>(null);
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

        effect(() => {
            const sede = this.sede();
            if (sede) {
                queueMicrotask(() => {
                    this.form.patchValue({
                        compania_id: sede.compania_id ?? '',
                        nombre: sede.nombre ?? '',
                        codigo: sede.codigo ?? '',
                        direccion: sede.direccion ?? '',
                        telefono: sede.telefono ?? '',
                        email: sede.email ?? '',
                        activo: !!sede.activo,
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
            compania_id: Number(payload.compania_id),
            nombre: payload.nombre,
            codigo: payload.codigo,
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
