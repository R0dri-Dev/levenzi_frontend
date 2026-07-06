import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LvButtonComponent } from '../../atoms/button/button';

import {
  LV_EMPTY_STATE_BASE,
  LV_EMPTY_STATE_SIZES,
  LV_EMPTY_STATE_VARIANTS,
  LV_EMPTY_STATE_ICON,
  LV_EMPTY_STATE_ICON_SIZES,
  LV_EMPTY_STATE_TITLE,
  LV_EMPTY_STATE_TITLE_SIZES,
  LV_EMPTY_STATE_DESCRIPTION,
  LV_EMPTY_STATE_DESCRIPTION_SIZES,
  LV_EMPTY_STATE_ACTIONS,
} from '../../../theme/empty-state.theme';
import type { EmptyStateSize, EmptyStateVariant } from '../../../types/empty-state.types';
import { LvIconComponent } from '../../icons/icon/icon';
import type { IconKeys } from '../../../core/icons';

@Component({
  selector: 'lv-empty-state',
  standalone: true,
  imports: [CommonModule, LvIconComponent, LvButtonComponent],
  templateUrl: './empty-state.html',
  styleUrl: './empty-state.css',
})
export class LvEmptyStateComponent {
  readonly title = input.required<string>();
  readonly description = input<string>();
  readonly icon = input<IconKeys>('inbox');
  readonly size = input<EmptyStateSize>('md');
  readonly variant = input<EmptyStateVariant>('default');
  readonly actionLabel = input<string>();
  readonly actionIcon = input<IconKeys>();

  readonly onAction = output<void>();

  readonly classes = computed(() => {
    const base = LV_EMPTY_STATE_BASE;
    const size = LV_EMPTY_STATE_SIZES[this.size()];
    const variant = LV_EMPTY_STATE_VARIANTS[this.variant()];

    return {
      container: [base, size, variant].filter(Boolean).join(' '),
      icon: [LV_EMPTY_STATE_ICON, LV_EMPTY_STATE_ICON_SIZES[this.size()]].filter(Boolean).join(' '),
      title: [LV_EMPTY_STATE_TITLE, LV_EMPTY_STATE_TITLE_SIZES[this.size()]].filter(Boolean).join(' '),
      description: [LV_EMPTY_STATE_DESCRIPTION, LV_EMPTY_STATE_DESCRIPTION_SIZES[this.size()]].filter(Boolean).join(' '),
      actions: LV_EMPTY_STATE_ACTIONS,
    };
  });

  handleAction(): void {
    this.onAction.emit();
  }
}
