import { Component, effect, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvInputComponent } from '../../../../shared/ui/atoms/input/input';
import { LvFormFieldComponent } from '../../../../shared/ui/molecules/form-field/form-field';
import { User } from '../../../../core/models/user.model';

@Component({
    selector: 'app-edit-user',
    standalone: true,
    imports: [ReactiveFormsModule, LvInputComponent, LvButtonComponent, LvFormFieldComponent],
    templateUrl: './edit.html',
    styleUrl: './edit.css',
})
export class EditUser {
    readonly usuario = input<User | null>(null);
    readonly submit = output<Partial<User>>();
    readonly cancel = output<void>();

    form: FormGroup;

    constructor(private readonly fb: FormBuilder) {
        this.form = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email]],
            password: [''],
            telefono: [''],
            activo: [true],
        });

        effect(() => {
            const usuario = this.usuario();
            if (usuario) {
                this.form.patchValue({
                    name: usuario.name ?? '',
                    email: usuario.email ?? '',
                    password: '',
                    telefono: usuario.telefono ?? '',
                    activo: !!usuario.activo,
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
            name: payload.name,
            email: payload.email,
            password: payload.password || undefined,
            telefono: payload.telefono || undefined,
            activo: payload.activo,
        });
    }

    onCancel(): void {
        this.cancel.emit();
    }
}
