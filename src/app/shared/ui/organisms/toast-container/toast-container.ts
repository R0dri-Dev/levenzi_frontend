import { Component, input, output, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvIconComponent } from '../../icons/icon/icon';
import { LvButtonComponent } from '../../atoms/button/button';
import { LvParagraphComponent } from '../../atoms/paragraph/paragraph';
import { LvIconButtonComponent } from '../../atoms/icon-button/icon-button';
import type { Toast } from '../../../interfaces/toast.interface';
import { ToastPosition } from '../../../types';


@Component({
  selector: 'lv-toast-container',
  standalone: true,
  imports: [CommonModule, LvIconComponent, LvButtonComponent, LvParagraphComponent, LvIconButtonComponent],
  templateUrl: './toast-container.html',
  styleUrls: ['./toast-container.css'],
})
export class LvToastContainerComponent {
  readonly toasts = input<Toast[]>([]);
  readonly position = input<ToastPosition>('top-right');
  readonly duration = input<number>(5000);

  readonly onToastClose = output<string | number>();
  readonly onToastAction = output<Toast>();

  private timers: Map<string | number, any> = new Map();

  constructor() {
    effect(() => {
      const toasts = this.toasts();
      const duration = this.duration();

      toasts.forEach(toast => {
        const toastDuration = toast.duration || duration;
        if (toastDuration > 0 && !this.timers.has(toast.id)) {
          const timer = setTimeout(() => {
            this.closeToast(toast.id);
          }, toastDuration);
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
}
