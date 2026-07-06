import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LV_BUTTON_BASE, LV_BUTTON_SIZES, LV_BUTTON_VARIANTS } from '../../../theme/button.theme';
import { LvIconComponent } from '../../icons/icon/icon';
import type { IconKeys } from '../../../core/icons/icons';
import type { ButtonVariant, ButtonSize } from '../../../types/button.types';

@Component({
  selector: 'lv-button',
  standalone: true,
  imports: [CommonModule, LvIconComponent],
  templateUrl: './button.html',
  styleUrl: './button.css',
})
export class LvButtonComponent {
  // Inputs
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly loading = input(false);
  readonly disabled = input(false);
  readonly fullWidth = input(false);
  readonly leftIcon = input<IconKeys>();
  readonly rightIcon = input<IconKeys>();
  readonly type = input<'button' | 'submit' | 'reset'>('button');

  // Outputs
  readonly onClick = output<Event>();

  // Computed
  readonly isDisabled = computed(() => this.disabled() || this.loading());

  readonly classes = computed(() => {
    const base = LV_BUTTON_BASE;
    const variant = LV_BUTTON_VARIANTS[this.variant()];
    const size = LV_BUTTON_SIZES[this.size()];
    const width = this.fullWidth() ? 'w-full' : '';

    return [base, variant, size, width].filter(Boolean).join(' ');
  });

  handleClick(event: Event): void {
    if (this.isDisabled()) return;
    this.onClick.emit(event);
  }
}
