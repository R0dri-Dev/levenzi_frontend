import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  LV_PASSWORD_INPUT_BASE,
  LV_PASSWORD_INPUT_SIZES,
  LV_PASSWORD_INPUT_VARIANTS,
} from '../../../theme/password-input.theme';
import type { PasswordInputSize, PasswordInputVariant } from '../../../types/password-input.types';

@Component({
  selector: 'lv-password-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './password-input.html',
  styleUrl: './password-input.css',
})
export class LvPasswordInputComponent {
  readonly variant = input<PasswordInputVariant>('primary');
  readonly size = input<PasswordInputSize>('md');

  readonly name = input<string>('');
  readonly placeholder = input<string>('');
  readonly disabled = input(false);

  readonly value = input<string>('');
  readonly onValueChange = output<string>();

  readonly isShown = input(false);

  readonly classes = computed(() => {
    const base = LV_PASSWORD_INPUT_BASE;
    const variant = LV_PASSWORD_INPUT_VARIANTS[this.variant()];
    const size = LV_PASSWORD_INPUT_SIZES[this.size()];

    return [base, variant, size].filter(Boolean).join(' ');
  });

  handleInput(value: string): void {
    if (this.disabled()) return;
    this.onValueChange.emit(value);
  }
}

