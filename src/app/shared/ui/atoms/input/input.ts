import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LV_INPUT_BASE, LV_INPUT_SIZES, LV_INPUT_VARIANTS } from '../../../theme/input.theme';
import type { InputAutocomplete, InputSize, InputType, InputVariant } from '../../../types/input.types';

@Component({
  selector: 'lv-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './input.html',
  styleUrl: './input.css',
})
export class LvInputComponent {
  readonly type = input<InputType>('text');
  readonly variant = input<InputVariant>('primary');
  readonly size = input<InputSize>('md');

  readonly placeholder = input<string>('');
  readonly value = input<string>('');
  readonly disabled = input(false);

  readonly autocomplete = input<InputAutocomplete>('off');

  readonly onValueChange = output<string>();

  readonly classes = computed(() => {
    const base = LV_INPUT_BASE;
    const variant = LV_INPUT_VARIANTS[this.variant()];
    const size = LV_INPUT_SIZES[this.size()];

    return [base, variant, size].filter(Boolean).join(' ');
  });

  handleInput(value: string): void {
    if (this.disabled()) return;
    this.onValueChange.emit(value);
  }
}

