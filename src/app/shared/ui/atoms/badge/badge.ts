import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LV_BADGE_THEME } from '../../../theme/badge.theme';
import type { BadgeVariant } from '../../../types/badge.types';

@Component({
  selector: 'lv-badge',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './badge.html',
  styleUrl: './badge.css',
})
export class LvBadgeComponent {
  readonly text = input<string>('');
  readonly variant = input<BadgeVariant>('primary');

  readonly classes = computed(() => {
    const base = LV_BADGE_THEME.base;
    const variant = LV_BADGE_THEME[this.variant()];
    return [base, variant].filter(Boolean).join(' ');
  });


}

