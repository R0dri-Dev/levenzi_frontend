import { Component, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';
import { LvInputComponent } from '../../../../shared/ui/atoms/input/input';
import { LvFormFieldComponent } from '../../../../shared/ui/molecules/form-field/form-field';
import { User } from '../../../../core/models/user.model';

@Component({
  selector: 'app-create-user',
  standalone: true,
  imports: [ReactiveFormsModule, LvInputComponent, LvButtonComponent, LvFormFieldComponent],
  templateUrl: './create.html',
  styleUrl: './create.css',
})
export class CreateUser {
  readonly submit = output<Partial<User>>();
  readonly cancel = output<void>();

  form: FormGroup;

  constructor(private readonly fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
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
      name: payload.name,
      email: payload.email,
      password: payload.password,
      telefono: payload.telefono || undefined,
      activo: payload.activo,
    });
    this.form.reset({ name: '', email: '', password: '', telefono: '', activo: true });
  }

  onCancel(): void {
    this.cancel.emit();
  }
}
