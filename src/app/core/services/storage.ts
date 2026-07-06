import { Injectable } from '@angular/core';

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

  get(key: string): string | null {
    return this.getStorage()?.getItem(key) ?? this.memory.get(key) ?? null;
  }

  set(key: string, value: string): void {
    const storage = this.getStorage();

    if (storage) {
      storage.setItem(key, value);
      return;
    }

    this.memory.set(key, value);
  }

  remove(key: string): void {
    const storage = this.getStorage();

    if (storage) {
      storage.removeItem(key);
      return;
    }

    this.memory.delete(key);
  }

  clear(): void {
    const storage = this.getStorage();

    if (storage) {
      storage.clear();
      return;
    }

    this.memory.clear();
  }

  private getStorage(): StorageBackend | null {
    try {
      return globalThis.localStorage;
    } catch {
      return null;
    }
  }
}
