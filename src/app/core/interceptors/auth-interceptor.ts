import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { Token } from '../services/token';


export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Solo añadimos Authorization si el request realmente va al backend.
  // (Trabajamos con URLs absolutas ya resueltas en Api.resolveUrl)
  if (!req.url.includes('/api/')) {
    return next(req);
  }

  const token = inject(Token);

  const accessToken = token.accessToken();

  return next(
    req.clone({
      setHeaders: {
        Accept: 'application/json',
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
    }),
  );
};
