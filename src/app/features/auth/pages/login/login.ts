import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import { Auth } from '../../../../core/services/auth';
import { LV_ROUTES } from '../../../../shared/constants/routes';
import type { LoginFormData } from '../../../../shared/types/login-form.types';
import { LvLoginFormComponent } from '../../../../shared/ui/organisms/login-form/login-form';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LvLoginFormComponent],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  handleSubmit(formData: LoginFormData): void {
    if (this.loading()) {
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    this.auth
      .login({
        email: formData.email,
        password: formData.password,
      })
      .pipe(finalize(() => this.loading.set(false)))
      .subscribe({
        next: () => {
          void this.router.navigateByUrl(LV_ROUTES.dashboard);
        },
        error: () => {
          this.error.set('No fue posible iniciar sesión. Verifica tus credenciales.');
        },
      });
  }

  handleForgotPassword(): void {
    void this.router.navigateByUrl(LV_ROUTES.forgotPassword);
  }

  handleRegister(): void {
    void this.router.navigateByUrl(LV_ROUTES.register);
  }
}
