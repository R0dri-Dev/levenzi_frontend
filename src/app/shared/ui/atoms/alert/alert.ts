import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LV_ALERT_THEME } from '../../../theme/alert.theme';

export type AlertVariant = 'success' | 'danger' | 'warning' | 'info';

@Component({
  selector: 'lv-alert',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './alert.html',
  styleUrl: './alert.css',
})
export class LvAlertComponent {
  readonly message = input<string>('');
  readonly variant = input<AlertVariant>('info');

  readonly classes = computed(() => {
    const base = LV_ALERT_THEME.base;
    const variant = (LV_ALERT_THEME as Record<AlertVariant, string>)[this.variant()];
    return [base, variant].filter(Boolean).join(' ');
  });
}

