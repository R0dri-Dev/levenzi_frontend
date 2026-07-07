// src/app/shared/ui/organisms/login-form/login-form.ts
import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { LvInputComponent } from '../../atoms/input/input';
import { LvButtonComponent } from '../../atoms/button/button';
import { LvHeadingComponent } from '../../atoms/heading/heading';
import { LvParagraphComponent } from '../../atoms/paragraph/paragraph';
import { LvIconComponent } from '../../icons/icon/icon';
import { LvPasswordFieldComponent } from '../../molecules/password-field/password-field';
import { LvRememberMeComponent } from '../../molecules/remember-me/remember-me';
import { LvFormErrorComponent } from '../../molecules/form-error/form-error';

import {
  LV_LOGIN_FORM_BASE,
  LV_LOGIN_FORM_CARD,
  LV_LOGIN_FORM_HEADER,
  LV_LOGIN_FORM_TITLE,
  LV_LOGIN_FORM_SUBTITLE,
  LV_LOGIN_FORM_FIELDS,
  LV_LOGIN_FORM_ACTIONS,
  LV_LOGIN_FORM_EXTRA,
  LV_LOGIN_FORM_FORGOT_PASSWORD,
  LV_LOGIN_FORM_REGISTER_LINK,
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
    LvHeadingComponent,
    LvParagraphComponent,
    LvIconComponent,
    LvPasswordFieldComponent,
    LvRememberMeComponent,
    LvFormErrorComponent,
  ],
  templateUrl: './login-form.html',
  // styleUrl: './login-form.css', // ← ELIMINADO
})
export class LvLoginFormComponent {
  readonly onSubmit = output<LoginFormData>();
  readonly onForgotPassword = output<void>();
  readonly onRegister = output<void>();

  readonly loading = input(false);
  readonly error = input<string | null>(null);

  readonly formData = signal<LoginFormData>({
    email: '',
    password: '',
    rememberMe: false,
  });

  protected readonly LV_LOGIN_FORM_BASE = LV_LOGIN_FORM_BASE;
  protected readonly LV_LOGIN_FORM_CARD = LV_LOGIN_FORM_CARD;
  protected readonly LV_LOGIN_FORM_HEADER = LV_LOGIN_FORM_HEADER;
  protected readonly LV_LOGIN_FORM_TITLE = LV_LOGIN_FORM_TITLE;
  protected readonly LV_LOGIN_FORM_SUBTITLE = LV_LOGIN_FORM_SUBTITLE;
  protected readonly LV_LOGIN_FORM_FIELDS = LV_LOGIN_FORM_FIELDS;
  protected readonly LV_LOGIN_FORM_ACTIONS = LV_LOGIN_FORM_ACTIONS;
  protected readonly LV_LOGIN_FORM_EXTRA = LV_LOGIN_FORM_EXTRA;
  protected readonly LV_LOGIN_FORM_FORGOT_PASSWORD = LV_LOGIN_FORM_FORGOT_PASSWORD;
  protected readonly LV_LOGIN_FORM_REGISTER_LINK = LV_LOGIN_FORM_REGISTER_LINK;

  handleSubmit(): void {
    if (this.loading()) return;
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
