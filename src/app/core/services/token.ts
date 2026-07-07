import { Injectable, computed, signal, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

import { LV_STORAGE_AUTH_SESSION } from '../../shared/constants/storage';
import type { AuthSession, LoginResponse } from '../../shared/types/auth.types';
import { Storage } from './storage';

@Injectable({
  providedIn: 'root',
})
export class Token {
  private isBrowser: boolean;

  readonly session = signal<AuthSession | null>(null);
  readonly accessToken = computed(() => this.session()?.accessToken ?? null);
  readonly tokenType = computed(() => this.session()?.tokenType ?? null);
  readonly expiresIn = computed(() => this.session()?.expiresIn ?? null);
  readonly expiresAt = computed(() => this.session()?.expiresAt ?? null);
  readonly hasToken = computed(() => this.session() !== null);

  constructor(
    private readonly storage: Storage,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    // ✅ Solo leer sesión si estamos en el navegador
    if (this.isBrowser) {
      this.session.set(this.readSession());
    }
  }

  set(response: LoginResponse): void {
    if (!this.isBrowser) return;

    const session: AuthSession = {
      accessToken: response.access_token,
      tokenType: response.token_type,
      expiresIn: response.expires_in,
      expiresAt: Date.now() + response.expires_in * 1000,
    };

    this.storage.set(LV_STORAGE_AUTH_SESSION, JSON.stringify(session));
    this.session.set(session);
  }

  clear(): void {
    if (!this.isBrowser) return;
    this.storage.remove(LV_STORAGE_AUTH_SESSION);
    this.session.set(null);
  }

  private readSession(): AuthSession | null {
    if (!this.isBrowser) return null;

    const rawSession = this.storage.get(LV_STORAGE_AUTH_SESSION);

    if (!rawSession) {
      return null;
    }

    try {
      const session = JSON.parse(rawSession) as Partial<AuthSession>;

      if (
        typeof session.accessToken !== 'string' ||
        typeof session.tokenType !== 'string' ||
        typeof session.expiresIn !== 'number' ||
        typeof session.expiresAt !== 'number'
      ) {
        this.storage.remove(LV_STORAGE_AUTH_SESSION);
        return null;
      }

      if (session.expiresAt <= Date.now()) {
        this.storage.remove(LV_STORAGE_AUTH_SESSION);
        return null;
      }

      return session as AuthSession;
    } catch {
      this.storage.remove(LV_STORAGE_AUTH_SESSION);
      return null;
    }
  }
}
