// shared/ui/atoms/input/input.ts
import { Component, computed, input, output, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvIconComponent } from '../../icons/icon/icon';
import {
  LV_INPUT_BASE,
  LV_INPUT_SIZES,
  LV_INPUT_VARIANTS,
  LV_INPUT_ICON,
} from '../../../theme/input.theme';
import type { InputVariant, InputSize, InputType } from '../../../types/input.types';
import type { IconKeys } from '../../../core/icons';

@Component({
  selector: 'lv-input',
  standalone: true,
  imports: [CommonModule, LvIconComponent],
  templateUrl: './input.html',
})
export class LvInputComponent {
  // ============ INPUTS ============
  readonly type = input<InputType>('text');
  readonly value = input<string>('');
  readonly placeholder = input<string>('');
  readonly variant = input<InputVariant>('primary');
  readonly size = input<InputSize>('md');
  readonly disabled = input(false);
  readonly readonly = input(false);
  readonly required = input(false);
  readonly minlength = input<number | null>(null);
  readonly maxlength = input<number | null>(null);
  readonly icon = input<IconKeys | null>(null);
  readonly iconPosition = input<'left' | 'right'>('left');

  // ============ OUTPUTS ============
  readonly onValueChange = output<string>();
  readonly onBlur = output<void>();
  readonly onFocus = output<void>();

  // ============ STATE ============
  internalValue = signal('');

  // ============ COMPUTED ============
  readonly classes = computed(() => {
    const base = LV_INPUT_BASE;
    const variant = LV_INPUT_VARIANTS[this.variant()] || LV_INPUT_VARIANTS['primary'];
    const size = LV_INPUT_SIZES[this.size()] || LV_INPUT_SIZES['md'];
    const hasIcon = this.icon() ? 'pl-10' : '';

    return {
      container: 'relative w-full',
      input: [base, variant, size, hasIcon].filter(Boolean).join(' '),
      icon: LV_INPUT_ICON,
    };
  });

  // ============ EFFECTS ============
  constructor() {
    effect(() => {
      const externalValue = this.value();
      if (externalValue !== this.internalValue()) {
        this.internalValue.set(externalValue);
      }
    });
  }

  // ============ METHODS ============
  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.internalValue.set(value);
    this.onValueChange.emit(value);
  }

  onBlurEvent(): void {
    this.onBlur.emit();
  }

  onFocusEvent(): void {
    this.onFocus.emit();
  }
}
