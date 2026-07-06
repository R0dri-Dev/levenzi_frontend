import { Component, computed, input, output, signal, HostListener, ElementRef, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LvButtonComponent } from '../../atoms/button/button';
import { LvIconButtonComponent } from '../../atoms/icon-button/icon-button';

import {
  LV_MODAL_OVERLAY,
  LV_MODAL_BASE,
  LV_MODAL_SIZES,
  LV_MODAL_VARIANTS,
  LV_MODAL_HEADER,
  LV_MODAL_TITLE,
  LV_MODAL_BODY,
  LV_MODAL_FOOTER,
} from '../../../theme/modal.theme';
import type { ModalSize, ModalVariant, ModalAction } from '../../../types/modal.types';

@Component({
  selector: 'lv-modal',
  standalone: true,
  imports: [CommonModule, LvButtonComponent, LvIconButtonComponent],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class LvModalComponent {
  readonly isOpen = input(false);
  readonly title = input<string>('');
  readonly size = input<ModalSize>('md');
  readonly variant = input<ModalVariant>('default');
  readonly actions = input<ModalAction[]>([]);
  readonly closeOnOverlay = input(true);
  readonly closeOnEscape = input(true);

  readonly onClose = output<void>();
  readonly onAction = output<ModalAction>();

  private modalRef = viewChild<ElementRef>('modal');
  private overlayRef = viewChild<ElementRef>('overlay');

  readonly classes = computed(() => {
    const base = LV_MODAL_BASE;
    const size = LV_MODAL_SIZES[this.size()];
    const variant = LV_MODAL_VARIANTS[this.variant()];

    return {
      overlay: LV_MODAL_OVERLAY,
      modal: [base, size, variant].filter(Boolean).join(' '),
      header: LV_MODAL_HEADER,
      title: LV_MODAL_TITLE,
      body: LV_MODAL_BODY,
      footer: LV_MODAL_FOOTER,
    };
  });

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.closeOnEscape() && this.isOpen()) {
      this.close();
    }
  }

  close(): void {
    this.onClose.emit();
  }

  handleCloseClick(): void {
    this.close();
  }

  handleOverlayClick(event: MouseEvent): void {
    if (this.closeOnOverlay() && event.target === this.overlayRef()?.nativeElement) {
      this.close();
    }
  }

  handleAction(action: ModalAction): void {
    if (action.disabled || action.loading) return;
    this.onAction.emit(action);
    action.action();
  }
}
