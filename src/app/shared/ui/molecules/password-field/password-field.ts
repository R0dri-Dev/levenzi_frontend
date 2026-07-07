import { Component, computed, input, output, signal, viewChild, ElementRef, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LvLabelComponent } from '../../atoms/label/label';
import { LvIconButtonComponent } from '../../atoms/icon-button/icon-button';

import {
  LV_PASSWORD_FIELD_BASE,
  LV_PASSWORD_FIELD_CONTAINER,
  LV_PASSWORD_FIELD_SIZES,
  LV_PASSWORD_FIELD_INPUT,
  LV_PASSWORD_FIELD_TOGGLE,
  LV_PASSWORD_FIELD_STRENGTH_BAR,
  LV_PASSWORD_FIELD_STRENGTH_FILL,
  LV_PASSWORD_FIELD_STRENGTH_TEXT,
  LV_PASSWORD_FIELD_ERROR,
  LV_PASSWORD_FIELD_HINT,
} from '../../../theme/password-field.theme';
import type { PasswordFieldVariant, PasswordFieldSize, PasswordFieldStrength } from '../../../types/password-field.types';
import { LvIconComponent } from '../../icons/icon/icon';
import { LvFormErrorComponent } from '../form-error/form-error';
import { LvInputComponent } from '../../atoms/input/input';
import type { InputType } from '../../../types/input.types';

@Component({
  selector: 'lv-password-field',
  standalone: true,
  imports: [CommonModule, FormsModule, LvIconComponent, LvLabelComponent, LvIconButtonComponent, LvFormErrorComponent, LvInputComponent],
  templateUrl: './password-field.html',
  styleUrl: './password-field.css',
})
export class LvPasswordFieldComponent {
  readonly label = input<string>('Contraseña');
  readonly placeholder = input<string>('Ingresa tu contraseña...');
  readonly variant = input<PasswordFieldVariant>('primary');
  readonly size = input<PasswordFieldSize>('md');
  readonly disabled = input(false);
  readonly value = input<string>('');
  readonly required = input(false);
  readonly showStrength = input(false);
  readonly minLength = input<number>(8);
  readonly hint = input<string>('');
  readonly error = input<string>('');
  readonly onValueChange = output<string>();
  readonly onToggleVisibility = output<boolean>();

  readonly inputElement = viewChild<ElementRef<HTMLInputElement>>('input');
  showPassword = signal(false);
  internalValue = signal('');


  readonly classes = computed(() => {
    const base = LV_PASSWORD_FIELD_BASE;
    const container = LV_PASSWORD_FIELD_CONTAINER;
    const size = LV_PASSWORD_FIELD_SIZES[this.size()];
    const error = this.error() ? 'border-red-500 focus-within:ring-red-500' : '';

    return {
      container: [base].filter(Boolean).join(' '),
      field: [container, size, error].filter(Boolean).join(' '),
      input: LV_PASSWORD_FIELD_INPUT,
      toggle: LV_PASSWORD_FIELD_TOGGLE,
      strengthBar: LV_PASSWORD_FIELD_STRENGTH_BAR,
      error: LV_PASSWORD_FIELD_ERROR,
      hint: LV_PASSWORD_FIELD_HINT,
    };
  });

  constructor() {
    effect(() => {
      const externalValue = this.value();
      if (externalValue !== this.internalValue()) {
        this.internalValue.set(externalValue);
      }
    });
  }

  get inputType(): InputType {
    return this.showPassword() ? 'text' : 'password';
  }

  getStrength(): PasswordFieldStrength | null {
    const value = this.internalValue();
    if (!value || value.length === 0) return null;

    const length = value.length;
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasSpecial = /[^A-Za-z0-9]/.test(value);

    let score = 0;
    if (length >= 8) score++;
    if (length >= 12) score++;
    if (hasUpper && hasLower) score++;
    if (hasNumber) score++;
    if (hasSpecial) score++;

    if (score <= 2) return 'weak';
    if (score <= 3) return 'medium';
    if (score <= 4) return 'strong';
    return 'very-strong';
  }

  getStrengthLabel(): string {
    const strength = this.getStrength();
    if (!strength) return '';

    const labels: Record<PasswordFieldStrength, string> = {
      weak: 'Débil',
      medium: 'Media',
      strong: 'Fuerte',
      'very-strong': 'Muy fuerte',
    };

    return labels[strength];
  }

  getStrengthFill(): string {
    const strength = this.getStrength();
    if (!strength) return '';
    return LV_PASSWORD_FIELD_STRENGTH_FILL[strength];
  }

  getStrengthTextClass(): string {
    const strength = this.getStrength();
    if (!strength) return '';
    return LV_PASSWORD_FIELD_STRENGTH_TEXT[strength];
  }

  onInputChange(value: string): void {
    this.internalValue.set(value);
    this.onValueChange.emit(value);
  }

  togglePasswordVisibility(): void {
    if (this.disabled()) return;
    this.showPassword.update(v => !v);
    this.onToggleVisibility.emit(this.showPassword());
  }
}
