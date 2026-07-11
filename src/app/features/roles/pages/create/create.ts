import { Component, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Role } from '../../../../core/models/role.model';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvInputComponent } from '../../../../shared/ui/atoms/input/input';
import { LvFormFieldComponent } from '../../../../shared/ui/molecules/form-field/form-field';

@Component({
    selector: 'app-create-role',
    standalone: true,
    imports: [ReactiveFormsModule, LvInputComponent, LvButtonComponent, LvFormFieldComponent],
    templateUrl: './create.html',
    styleUrl: './create.css',
})
export class CreateRole {
    readonly submit = output<Partial<Role>>();
    readonly cancel = output<void>();

    form: FormGroup;

    constructor(private readonly fb: FormBuilder) {
        this.form = this.fb.group({
            name: ['', [Validators.required, Validators.minLength(2)]],
            guard_name: ['api'],
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
            guard_name: payload.guard_name || 'api',
        });
        this.form.reset({ name: '', guard_name: 'api' });
    }

    onCancel(): void {
        this.cancel.emit();
    }
}
