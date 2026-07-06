import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LV_CHECKBOX_BASE, LV_CHECKBOX_SIZES, LV_CHECKBOX_VARIANTS } from '../../../theme/checkbox.theme';
import type { CheckboxSize, CheckboxVariant } from '../../../types/checkbox.types';

@Component({
  selector: 'lv-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox.html',
  styleUrl: './checkbox.css',
})
export class LvCheckboxComponent {
  readonly variant = input<CheckboxVariant>('primary');
  readonly size = input<CheckboxSize>('md');

  readonly disabled = input(false);
  readonly checked = input(false);

  readonly onChange = output<boolean>();

  readonly classes = computed(() => {
    const base = LV_CHECKBOX_BASE;
    const variant = LV_CHECKBOX_VARIANTS[this.variant()];
    const size = LV_CHECKBOX_SIZES[this.size()];
    return [base, variant, size].filter(Boolean).join(' ');
  });

  handleChange(event: Event): void {
    if (this.disabled()) return;
    const target = event.target as HTMLInputElement;
    this.onChange.emit(target.checked);
  }
}



