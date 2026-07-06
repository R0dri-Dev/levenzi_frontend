import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { LV_API_BASE_URL } from '../../shared/constants/api';
import { Token } from '../services/token';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (!req.url.startsWith(LV_API_BASE_URL)) {
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
