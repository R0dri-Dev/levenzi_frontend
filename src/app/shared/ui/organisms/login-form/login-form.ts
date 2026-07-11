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
import { LvLinkComponent } from '../../atoms/link/link';
import { LoginFormData } from '../../../interfaces/login.interface';

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
    LvPasswordFieldComponent,
    LvRememberMeComponent,
    LvFormErrorComponent,
    LvLinkComponent,
  ],
  templateUrl: './login-form.html',
  styleUrls: ['./login-form.css'],
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
