import { Component, input, output, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvButtonComponent } from '../../atoms/button/button';
import { LvIconComponent } from '../../icons/icon/icon';
import { LvHeadingComponent } from '../../atoms/heading/heading';
import { LvParagraphComponent } from '../../atoms/paragraph/paragraph';
import { LvColorVariant, LvSize } from '../../../types';

@Component({
  selector: 'lv-confirm-dialog',
  standalone: true,
  imports: [CommonModule, LvButtonComponent, LvIconComponent, LvHeadingComponent, LvParagraphComponent],
  templateUrl: './confirm-dialog.html',
  styleUrls: ['./confirm-dialog.css'],
})
export class LvConfirmDialogComponent {
  readonly isOpen = input(false);
  readonly title = input.required<string>();
  readonly message = input.required<string>();
  readonly variant = input<LvColorVariant>('danger');
  readonly size = input<LvSize>('md');
  readonly confirmLabel = input<string>('Confirmar');
  readonly cancelLabel = input<string>('Cancelar');
  readonly confirmLoading = input(false);
  readonly closeOnEscape = input(true);

  readonly onConfirm = output<void>();
  readonly onCancel = output<void>();
  readonly onClose = output<void>();

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
}
