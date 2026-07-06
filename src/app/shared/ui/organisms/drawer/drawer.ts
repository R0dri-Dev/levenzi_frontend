import { Component, computed, input, output, signal, HostListener, ElementRef, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LvIconButtonComponent } from '../../atoms/icon-button/icon-button';


import {
  LV_DRAWER_OVERLAY,
  LV_DRAWER_BASE,
  LV_DRAWER_POSITIONS,
  LV_DRAWER_SIZES,
  LV_DRAWER_VARIANTS,
  LV_DRAWER_HEADER,
  LV_DRAWER_TITLE,
  LV_DRAWER_BODY,
  LV_DRAWER_FOOTER,
} from '../../../theme/drawer.theme';
import type { DrawerPosition, DrawerSize, DrawerVariant } from '../../../types/drawer.types';

@Component({
  selector: 'lv-drawer',
  standalone: true,
  imports: [CommonModule, LvIconButtonComponent],
  templateUrl: './drawer.html',
  styleUrl: './drawer.css',
})
export class LvDrawerComponent {
  readonly isOpen = input(false);
  readonly title = input<string>('');
  readonly position = input<DrawerPosition>('right');
  readonly size = input<DrawerSize>('md');
  readonly variant = input<DrawerVariant>('default');
  readonly closeOnOverlay = input(true);
  readonly closeOnEscape = input(true);

  readonly onClose = output<void>();

  private drawerRef = viewChild<ElementRef>('drawer');
  private overlayRef = viewChild<ElementRef>('overlay');

  readonly classes = computed(() => {
    const base = LV_DRAWER_BASE;
    const position = LV_DRAWER_POSITIONS[this.position()];
    const size = LV_DRAWER_SIZES[this.position()][this.size()];
    const variant = LV_DRAWER_VARIANTS[this.variant()];

    return {
      overlay: LV_DRAWER_OVERLAY,
      drawer: [base, position, size, variant].filter(Boolean).join(' '),
      header: LV_DRAWER_HEADER,
      title: LV_DRAWER_TITLE,
      body: LV_DRAWER_BODY,
      footer: LV_DRAWER_FOOTER,
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

  getTranslate(): string {
    const position = this.position();
    const isOpen = this.isOpen();
    const map: Record<DrawerPosition, string> = {
      left: `translate-x-${isOpen ? '0' : '-100%'}`,
      right: `translate-x-${isOpen ? '0' : '100%'}`,
      top: `translate-y-${isOpen ? '0' : '-100%'}`,
      bottom: `translate-y-${isOpen ? '0' : '100%'}`,
    };
    return map[position];
  }
}
