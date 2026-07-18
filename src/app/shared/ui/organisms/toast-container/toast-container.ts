// shared/ui/organisms/toast-container/toast-container.ts
import { Component, input, output, effect, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvIconComponent } from '../../icons/icon/icon';
import { LvButtonComponent } from '../../atoms/button/button';
import { LvParagraphComponent } from '../../atoms/paragraph/paragraph';
import { LvIconButtonComponent } from '../../atoms/icon-button/icon-button';
import type { Toast, ToastPosition } from '../../../interfaces/toast.interface';

@Component({
  selector: 'lv-toast-container',
  standalone: true,
  imports: [CommonModule, LvIconComponent, LvButtonComponent, LvParagraphComponent, LvIconButtonComponent],
  templateUrl: './toast-container.html',
  styleUrls: ['./toast-container.css'],
})
export class LvToastContainerComponent implements OnDestroy {
  readonly toasts = input<Toast[]>([]);
  readonly position = input<ToastPosition>('top-right');
  readonly duration = input<number>(5000);

  readonly onToastClose = output<string | number>();
  readonly onToastAction = output<Toast>();

  private timers = new Map<string | number, ReturnType<typeof setTimeout>>();

  constructor() {
    effect(() => {
      const toasts = this.toasts();
      const defaultDuration = this.duration();
      const currentIds = new Set(toasts.map(t => t.id));

      // Limpia timers de toasts que ya no existen (cerrados manualmente)
      for (const [id, timer] of this.timers) {
        if (!currentIds.has(id)) {
          clearTimeout(timer);
          this.timers.delete(id);
        }
      }

      // Programa cierre para toasts nuevos
      toasts.forEach(toast => {
        const toastDuration = toast.duration ?? defaultDuration;
        if (toastDuration > 0 && !this.timers.has(toast.id)) {
          const timer = setTimeout(() => this.closeToast(toast.id), toastDuration);
          this.timers.set(toast.id, timer);
        }
      });
    });
  }

  closeToast(id: string | number): void {
    if (this.timers.has(id)) {
      clearTimeout(this.timers.get(id));
      this.timers.delete(id);
    }
    this.onToastClose.emit(id);
  }

  handleAction(toast: Toast): void {
    if (toast.action) {
      toast.action.onClick();
    }
    this.onToastAction.emit(toast);
  }

  ngOnDestroy(): void {
    this.timers.forEach(timer => clearTimeout(timer));
    this.timers.clear();
  }
}