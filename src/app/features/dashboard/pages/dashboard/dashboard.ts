import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

import { Auth } from '../../../../core/services/auth';
import { LV_ROUTES } from '../../../../shared/constants/routes';
import { LvButtonComponent } from '../../../../shared/ui/atoms/button/button';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LvButtonComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard {
  private readonly auth = inject(Auth);
  private readonly router = inject(Router);

  readonly loggingOut = signal(false);

  logout(): void {
    if (this.loggingOut()) {
      return;
    }

    this.loggingOut.set(true);

    this.auth
      .logout()
      .pipe(finalize(() => this.loggingOut.set(false)))
      .subscribe({
        next: () => {
          void this.router.navigateByUrl(LV_ROUTES.login);
        },
        error: () => {
          void this.router.navigateByUrl(LV_ROUTES.login);
        },
      });
  }
}
