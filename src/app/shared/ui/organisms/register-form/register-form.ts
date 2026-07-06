import { Component, output, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LvInputComponent } from '../../atoms/input/input';
import { LvButtonComponent } from '../../atoms/button/button';
import { LvPasswordFieldComponent } from '../../molecules/password-field/password-field';
import { LvCheckboxComponent } from '../../atoms/checkbox/checkbox';

import type { RegisterFormData } from '../../../types/register-form.types';

@Component({
  selector: 'lv-register-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LvInputComponent,
    LvButtonComponent,
    LvPasswordFieldComponent,
    LvCheckboxComponent,
  ],
  templateUrl: './register-form.html',
  styleUrl: './register-form.css',
})
export class LvRegisterFormComponent {
  readonly onSubmit = output<RegisterFormData>();
  readonly onLogin = output<void>();

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly formData = signal<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });

  readonly passwordsMatch = computed(() => {
    const data = this.formData();
    return data.password === data.confirmPassword;
  });

  readonly isFormValid = computed(() => {
    const data = this.formData();
    return (
      data.name.length > 0 &&
      data.email.length > 0 &&
      data.password.length >= 8 &&
      this.passwordsMatch() &&
      data.acceptTerms
    );
  });

  handleSubmit(): void {
    if (this.loading() || !this.isFormValid()) return;

    this.error.set(null);
    this.onSubmit.emit(this.formData());
  }

  handleLogin(): void {
    this.onLogin.emit();
  }

  updateField<K extends keyof RegisterFormData>(field: K, value: RegisterFormData[K]): void {
    this.formData.update(data => ({ ...data, [field]: value }));
  }
}
