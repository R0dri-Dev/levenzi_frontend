import { Component, input, output, HostListener, ElementRef, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvIconButtonComponent } from '../../atoms/icon-button/icon-button';
import { LvHeadingComponent } from '../../atoms/heading/heading';
import { LvSize, LvColorVariant } from '../../../types';

export type DrawerPosition = 'left' | 'right' | 'top' | 'bottom';

@Component({
  selector: 'lv-drawer',
  standalone: true,
  imports: [CommonModule, LvIconButtonComponent, LvHeadingComponent],
  templateUrl: './drawer.html',
  styleUrls: ['./drawer.css'],
})
export class LvDrawerComponent {
  readonly isOpen = input(false);
  readonly title = input<string>('');
  readonly position = input<DrawerPosition>('right');
  readonly size = input<LvSize>('md');
  readonly color = input<LvColorVariant>('neutral');
  readonly closeOnOverlay = input(true);
  readonly closeOnEscape = input(true);

  readonly onClose = output<void>();

  private drawerRef = viewChild<ElementRef>('drawer');
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
}
