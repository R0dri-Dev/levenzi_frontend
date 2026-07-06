import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LvIconComponent } from '../../icons/icon/icon';
import { LV_ICON_BUTTON_BASE, LV_ICON_BUTTON_SIZES, LV_ICON_BUTTON_VARIANTS } from '../../../theme/icon-button.theme';
import type { ButtonSize, ButtonVariant } from '../../../types/button.types';
import type { IconKeys } from '../../../core/icons';

@Component({
  selector: 'lv-icon-button',
  standalone: true,
  imports: [CommonModule, LvIconComponent],
  templateUrl: './icon-button.html',
  styleUrl: './icon-button.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LvIconButtonComponent {
  readonly icon = input.required<IconKeys>();
  readonly label = input.required<string>();
  readonly variant = input<ButtonVariant>('ghost');
  readonly size = input<ButtonSize>('md');
  readonly disabled = input(false);
  readonly type = input<'button' | 'submit' | 'reset'>('button');

  readonly onClick = output<Event>();

  readonly classes = computed(() => {
    const base = LV_ICON_BUTTON_BASE;
    const variant = LV_ICON_BUTTON_VARIANTS[this.variant()];
    const size = LV_ICON_BUTTON_SIZES[this.size()];

    return [base, variant, size].filter(Boolean).join(' ');
  });

  handleClick(event: Event): void {
    if (this.disabled()) return;
    this.onClick.emit(event);
  }
}
