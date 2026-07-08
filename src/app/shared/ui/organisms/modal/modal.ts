import { Component, input, output, HostListener, ElementRef, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvButtonComponent } from '../../atoms/button/button';
import { LvIconButtonComponent } from '../../atoms/icon-button/icon-button';
import { LvHeadingComponent } from '../../atoms/heading/heading';
import { LvSize, LvColorVariant } from '../../../types';
import type { ModalAction } from '../../../interfaces/modal.interface';

@Component({
  selector: 'lv-modal',
  standalone: true,
  imports: [CommonModule, LvButtonComponent, LvIconButtonComponent, LvHeadingComponent],
  templateUrl: './modal.html',
  styleUrls: ['./modal.css'],
})
export class LvModalComponent {
  readonly isOpen = input(false);
  readonly title = input<string>('');
  readonly size = input<LvSize>('md');
  readonly color = input<LvColorVariant>('primary');
  readonly actions = input<ModalAction[]>([]);
  readonly closeOnOverlay = input(true);
  readonly closeOnEscape = input(true);

  readonly onClose = output<void>();
  readonly onAction = output<ModalAction>();

  private modalRef = viewChild<ElementRef>('modal');
  private overlayRef = viewChild<ElementRef>('overlay');

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
