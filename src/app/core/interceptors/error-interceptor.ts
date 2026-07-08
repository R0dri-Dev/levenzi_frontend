import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';


import { LV_ROUTES } from '../../shared/constants/routes';
import { Auth } from '../services/auth';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(Auth);
  const router = inject(Router);

  return next(req).pipe(
    catchError(error => {
      if (error instanceof HttpErrorResponse) {
        const isLoginRequest = req.url.includes('/api/auth/login');

        if (!isLoginRequest && (error.status === 401 || error.status === 403)) {
          auth.clearSession();
          void router.navigateByUrl(LV_ROUTES.login);
        }

      }

      return throwError(() => error);
    }),
  );
};
