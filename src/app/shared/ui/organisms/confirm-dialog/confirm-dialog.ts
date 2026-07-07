import { Component, computed, input, output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LvButtonComponent } from '../../atoms/button/button';

import {
  LV_CONFIRM_DIALOG_OVERLAY,
  LV_CONFIRM_DIALOG_BASE,
  LV_CONFIRM_DIALOG_VARIANTS,
  LV_CONFIRM_DIALOG_ICON,
  LV_CONFIRM_DIALOG_ICON_VARIANTS,
  LV_CONFIRM_DIALOG_ICON_ICONS,
  LV_CONFIRM_DIALOG_TITLE,
  LV_CONFIRM_DIALOG_MESSAGE,
  LV_CONFIRM_DIALOG_ACTIONS,
} from '../../../theme/confirm-dialog.theme';
import type { ConfirmDialogVariant, ConfirmDialogSize } from '../../../types/confirm-dialog.types';
import { LvIconComponent } from '../../icons/icon/icon';

@Component({
  selector: 'lv-confirm-dialog',
  standalone: true,
  imports: [CommonModule, LvButtonComponent, LvIconComponent],
  templateUrl: './confirm-dialog.html',
  styleUrl: './confirm-dialog.css',
})
export class LvConfirmDialogComponent {
  readonly isOpen = input(false);
  readonly title = input.required<string>();
  readonly message = input.required<string>();
  readonly variant = input<ConfirmDialogVariant>('danger');
  readonly size = input<ConfirmDialogSize>('md');
  readonly confirmLabel = input<string>('Confirmar');
  readonly cancelLabel = input<string>('Cancelar');
  readonly confirmLoading = input(false);
  readonly closeOnEscape = input(true);

  readonly onConfirm = output<void>();
  readonly onCancel = output<void>();
  readonly onClose = output<void>();

  readonly classes = computed(() => {
    const base = LV_CONFIRM_DIALOG_BASE;
    const variant = LV_CONFIRM_DIALOG_VARIANTS[this.variant()];

    return {
      overlay: LV_CONFIRM_DIALOG_OVERLAY,
      dialog: [base, variant].filter(Boolean).join(' '),
      icon: [LV_CONFIRM_DIALOG_ICON, LV_CONFIRM_DIALOG_ICON_VARIANTS[this.variant()]].filter(Boolean).join(' '),
      title: LV_CONFIRM_DIALOG_TITLE,
      message: LV_CONFIRM_DIALOG_MESSAGE,
      actions: LV_CONFIRM_DIALOG_ACTIONS,
    };
  });

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.closeOnEscape() && this.isOpen()) {
      this.handleCancel();
    }
  }

  handleConfirm(): void {
    this.onConfirm.emit();
  }

  handleCancel(): void {
    this.onCancel.emit();
    this.onClose.emit();
  }

  getIconName(): string {
    return LV_CONFIRM_DIALOG_ICON_ICONS[this.variant()];
  }

  getConfirmVariant(): 'danger' | 'warning' | 'primary' | 'success' {
    const variantMap: Record<ConfirmDialogVariant, 'danger' | 'warning' | 'primary' | 'success'> = {
      danger: 'danger',
      warning: 'warning',
      info: 'primary',
      success: 'success',
    };
    return variantMap[this.variant()];
  }
}
