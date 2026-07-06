import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

import { LV_ROUTES } from '../../shared/constants/routes';
import { Auth } from '../services/auth';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(Auth);

  if (auth.hasSession()) {
    return true;
  }

  return inject(Router).createUrlTree([LV_ROUTES.login]);
};
