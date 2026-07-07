import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

type StorageBackend = {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
};

@Injectable({
  providedIn: 'root',
})
export class Storage {
  private readonly memory = new Map<string, string>();
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  get(key: string): string | null {
    const storage = this.getStorage();
    if (storage) {
      try {
        return storage.getItem(key);
      } catch {
        return this.memory.get(key) ?? null;
      }
    }
    return this.memory.get(key) ?? null;
  }

  set(key: string, value: string): void {
    const storage = this.getStorage();

    if (storage) {
      try {
        storage.setItem(key, value);
        return;
      } catch {
        // Si falla localStorage, guardar en memoria
        this.memory.set(key, value);
        return;
      }
    }

    this.memory.set(key, value);
  }

  remove(key: string): void {
    const storage = this.getStorage();

    if (storage) {
      try {
        storage.removeItem(key);
        return;
      } catch {
        this.memory.delete(key);
        return;
      }
    }

    this.memory.delete(key);
  }

  clear(): void {
    const storage = this.getStorage();

    if (storage) {
      try {
        storage.clear();
        return;
      } catch {
        this.memory.clear();
        return;
      }
    }

    this.memory.clear();
  }

  has(key: string): boolean {
    const storage = this.getStorage();
    if (storage) {
      try {
        return storage.getItem(key) !== null;
      } catch {
        return this.memory.has(key);
      }
    }
    return this.memory.has(key);
  }

  private getStorage(): StorageBackend | null {
    if (!this.isBrowser) return null;

    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        return window.localStorage;
      }
      return null;
    } catch {
      return null;
    }
  }
}
