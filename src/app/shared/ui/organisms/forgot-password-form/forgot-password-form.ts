import { Component, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LvInputComponent } from '../../atoms/input/input';
import { LvButtonComponent } from '../../atoms/button/button';

@Component({
  selector: 'lv-forgot-password-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LvInputComponent,
    LvButtonComponent,
  ],
  templateUrl: './forgot-password-form.html',
  styleUrl: './forgot-password-form.css',
})
export class LvForgotPasswordFormComponent {
  readonly onSubmit = output<string>();
  readonly onBackToLogin = output<void>();

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);
  readonly success = signal(false);

  readonly email = signal('');

  handleSubmit(): void {
    if (this.loading() || !this.email()) return;

    this.error.set(null);
    this.onSubmit.emit(this.email());
  }

  handleBackToLogin(): void {
    this.onBackToLogin.emit();
  }
}
