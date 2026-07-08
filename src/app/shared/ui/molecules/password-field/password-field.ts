import { Component, computed, input, output, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LvLabelComponent } from '../../atoms/label/label';
import { LvIconButtonComponent } from '../../atoms/icon-button/icon-button';
import { LvIconComponent } from '../../icons/icon/icon';
import { LvFormErrorComponent } from '../form-error/form-error';
import { LvInputComponent } from '../../atoms/input/input';
import { LvParagraphComponent } from '../../atoms/paragraph/paragraph';
import { LvButtonComponent } from '../../atoms/button/button';
import { LvSize, LvColorVariant } from '../../../types';

export type PasswordFieldStrength = 'weak' | 'medium' | 'strong' | 'very-strong';

@Component({
  selector: 'lv-password-field',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LvIconComponent,
    LvLabelComponent,
    LvIconButtonComponent,
    LvFormErrorComponent,
    LvInputComponent,
    LvParagraphComponent,
    LvButtonComponent
  ],
  templateUrl: './password-field.html',
  styleUrls: ['./password-field.css'],
})
export class LvPasswordFieldComponent {
  readonly label = input<string>('Contraseña');
  readonly placeholder = input<string>('Ingresa tu contraseña');
  readonly color = input<LvColorVariant>('primary');
  readonly size = input<LvSize>('md');
  readonly disabled = input(false);
  readonly value = input<string>('');
  readonly required = input(false);
  readonly showStrength = input(false);
  readonly minLength = input<number>(8);
  readonly hint = input<string>('');
  readonly error = input<string>('');

  readonly onValueChange = output<string>();
  readonly onToggleVisibility = output<boolean>();

  showPassword = signal(false);
  internalValue = signal('');

  constructor() {
    effect(() => {
      const externalValue = this.value();
      if (externalValue !== this.internalValue()) {
        this.internalValue.set(externalValue);
      }
    });
  }

  get inputType(): 'text' | 'password' {
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
