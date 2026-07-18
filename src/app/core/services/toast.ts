// core/services/toast.ts
import { Injectable, signal } from '@angular/core';
import type { Toast } from '../../shared/interfaces/toast.interface';

@Injectable({ providedIn: 'root' })
export class ToastService {
  private readonly _toasts = signal<Toast[]>([]);
  readonly toasts = this._toasts.asReadonly();
  private nextId = 0;

  private push(toast: Omit<Toast, 'id'>): void {
    const id = this.nextId++;
    this._toasts.update(list => [...list, { ...toast, id }]);
  }

  success(message: string, title?: string, options?: Partial<Toast>): void {
    this.push({ message, title, variant: 'success', icon: 'check', ...options });
  }

  danger(message: string, title?: string, options?: Partial<Toast>): void {
    this.push({ message, title, variant: 'danger', icon: 'errorCircle', duration: 7000, ...options });
  }

  warning(message: string, title?: string, options?: Partial<Toast>): void {
    this.push({ message, title, variant: 'warning', icon: 'warning', ...options });
  }

  info(message: string, title?: string, options?: Partial<Toast>): void {
    this.push({ message, title, variant: 'info', icon: 'info', ...options });
  }

  close(id: string | number): void {
    this._toasts.update(list => list.filter(t => t.id !== id));
  }

  clear(): void {
    this._toasts.set([]);
  }
}