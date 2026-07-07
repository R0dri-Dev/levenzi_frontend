import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  LV_LABEL_BASE,
  LV_LABEL_SIZES,
  LV_LABEL_VARIANTS,
} from '../../../theme/label.theme';
import type { LabelSize, LabelVariant } from '../../../types/label.types';

@Component({
  selector: 'lv-label',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './label.html',
  styleUrl: './label.css',
})
export class LvLabelComponent {
  readonly text = input<string>('');
  readonly for = input<string>('');
  readonly required = input(false);

  readonly variant = input<LabelVariant>('primary');
  readonly size = input<LabelSize>('md');

  readonly disabled = input(false);

  readonly classes = computed(() => {
    const base = LV_LABEL_BASE;
    const variant = LV_LABEL_VARIANTS[this.variant()];
    const size = LV_LABEL_SIZES[this.size()];

    return [base, variant, size].filter(Boolean).join(' ');
  });
}

