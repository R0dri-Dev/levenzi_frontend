import { Injectable, computed, inject } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';

import { LV_API_AUTH_LOGIN, LV_API_AUTH_LOGOUT } from '../../shared/constants/api';
import type { LoginCredentials, LoginResponse, LogoutResponse } from '../../shared/types/auth.types';
import { Api } from './api';
import { Token } from './token';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly api = inject(Api);
  private readonly token = inject(Token);

  readonly isAuthenticated = computed(() => this.token.hasToken());
  readonly accessToken = computed(() => this.token.accessToken());

  login(credentials: LoginCredentials): Observable<LoginResponse> {
    return this.api.post<LoginResponse>(LV_API_AUTH_LOGIN, credentials).pipe(
      tap(response => this.token.set(response)),
    );
  }

  logout(): Observable<LogoutResponse> {
    return this.api.post<LogoutResponse>(LV_API_AUTH_LOGOUT, {}).pipe(
      tap(() => this.token.clear()),
      catchError(error => {
        this.token.clear();
        return throwError(() => error);
      }),
    );
  }

  clearSession(): void {
    this.token.clear();
  }

  hasSession(): boolean {
    return this.token.hasToken();
  }
}
