import { Component, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LvInputComponent } from '../../atoms/input/input';
import { LvButtonComponent } from '../../atoms/button/button';
import { LvLabelComponent } from '../../atoms/label/label';
import { LvPasswordFieldComponent } from '../../molecules/password-field/password-field';
import { LvRememberMeComponent } from '../../molecules/remember-me/remember-me';

import {
  LV_LOGIN_FORM_BASE,
  LV_LOGIN_FORM_CARD,
  LV_LOGIN_FORM_HEADER,
  LV_LOGIN_FORM_TITLE,
  LV_LOGIN_FORM_SUBTITLE,
  LV_LOGIN_FORM_FIELDS,
  LV_LOGIN_FORM_ACTIONS,
  LV_LOGIN_FORM_EXTRA,
} from '../../../theme/login-form.theme';
import type { LoginFormData } from '../../../types/login-form.types';

@Component({
  selector: 'lv-login-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    LvInputComponent,
    LvButtonComponent,
    LvLabelComponent,
    LvPasswordFieldComponent,
    LvRememberMeComponent,
  ],
  templateUrl: './login-form.html',
  styleUrl: './login-form.css',
})
export class LvLoginFormComponent {
  readonly onSubmit = output<LoginFormData>();
  readonly onForgotPassword = output<void>();
  readonly onRegister = output<void>();

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  readonly formData = signal<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  handleSubmit(): void {
    if (this.loading()) return;

    this.error.set(null);
    this.onSubmit.emit(this.formData());
  }

  handleForgotPassword(): void {
    this.onForgotPassword.emit();
  }

  handleRegister(): void {
    this.onRegister.emit();
  }

  updateEmail(value: string): void {
    this.formData.update(data => ({ ...data, email: value }));
  }

  updatePassword(value: string): void {
    this.formData.update(data => ({ ...data, password: value }));
  }

  updateRememberMe(value: boolean): void {
    this.formData.update(data => ({ ...data, rememberMe: value }));
  }
}
