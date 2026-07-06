import { Component, computed, input, output } from '@angular/core';
import {
  LV_TEXTAREA_BASE,
  LV_TEXTAREA_SIZES,
  LV_TEXTAREA_VARIANTS,
} from '../../../theme/textarea.theme';
import type { TextareaVariant, TextareaSize } from '../../../types/textarea.types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lv-textarea',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './textarea.html',
  styleUrl: './textarea.css',
})
export class LvTextareaComponent {
  readonly value = input<string>('');
  readonly placeholder = input<string>('');
  readonly disabled = input(false);

  readonly variant = input<TextareaVariant>('primary');
  readonly size = input<TextareaSize>('md');

  readonly onValueChange = output<string>();

  readonly classes = computed(() => {
    const base = LV_TEXTAREA_BASE;
    const variant = LV_TEXTAREA_VARIANTS[this.variant()];
    const size = LV_TEXTAREA_SIZES[this.size()];
    return [base, variant, size].filter(Boolean).join(' ');
  });

  handleInput(value: string): void {
    if (this.disabled()) return;
    this.onValueChange.emit(value);
  }
}

