import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

import type { Option } from '../../../types/option.types';

import {
  LV_SELECT_BASE,
  LV_SELECT_SIZES,
  LV_SELECT_VARIANTS,
} from '../../../theme/select.theme';
import type { SelectVariant, SelectSize } from '../../../types/select.types';

@Component({
  selector: 'lv-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.html',
  styleUrl: './select.css',
})
export class LvSelectComponent {
  readonly options = input<Option[]>([]);
  readonly value = input<string | number>('');
  readonly disabled = input(false);

  readonly variant = input<SelectVariant>('primary');
  readonly size = input<SelectSize>('md');

  readonly onValueChange = output<string | number>();

  readonly classes = computed(() => {
    const base = LV_SELECT_BASE;
    const variant = LV_SELECT_VARIANTS[this.variant()];
    const size = LV_SELECT_SIZES[this.size()];
    return [base, variant, size].filter(Boolean).join(' ');
  });

  handleChange(raw: string): void {
    if (this.disabled()) return;
    const num = Number(raw);
    this.onValueChange.emit(Number.isNaN(num) ? raw : num);
  }
}

