import { Injectable, computed, signal } from '@angular/core';

import { LV_STORAGE_AUTH_SESSION } from '../../shared/constants/storage';
import type { AuthSession, LoginResponse } from '../../shared/types/auth.types';
import { Storage } from './storage';

@Injectable({
  providedIn: 'root',
})
export class Token {
  readonly session = signal<AuthSession | null>(this.readSession());

  readonly accessToken = computed(() => this.session()?.accessToken ?? null);
  readonly tokenType = computed(() => this.session()?.tokenType ?? null);
  readonly expiresIn = computed(() => this.session()?.expiresIn ?? null);
  readonly expiresAt = computed(() => this.session()?.expiresAt ?? null);
  readonly hasToken = computed(() => this.session() !== null);

  constructor(private readonly storage: Storage) { }

  set(response: LoginResponse): void {
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
    this.storage.remove(LV_STORAGE_AUTH_SESSION);
    this.session.set(null);
  }

  private readSession(): AuthSession | null {
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
