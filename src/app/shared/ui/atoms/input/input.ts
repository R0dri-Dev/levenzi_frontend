import { Component, input, output, signal, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LvIconComponent } from '../../icons/icon/icon';
import { LvSize, LvColorVariant, LvAppearance, LvInputType } from '../../../types';
import type { IconKeys } from '../../../core/icons';

@Component({
  selector: 'lv-input',
  standalone: true,
  imports: [CommonModule, LvIconComponent],
  templateUrl: './input.html',
  styleUrls: ['./input.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LvInputComponent),
      multi: true,
    },
  ],
})
export class LvInputComponent implements ControlValueAccessor {
  // ============ INPUTS (presentación, NO controlan el valor) ============
  readonly type = input<LvInputType>('text');
  readonly placeholder = input<string>('');
  readonly variant = input<LvColorVariant>('primary');
  readonly appearance = input<LvAppearance>('outline');
  readonly size = input<LvSize>('md');
  readonly disabled = input(false);
  readonly readonly = input(false);
  readonly required = input(false);
  readonly minlength = input<number | null>(null);
  readonly maxlength = input<number | null>(null);
  readonly icon = input<IconKeys | null>(null);
  readonly iconPosition = input<'left' | 'right'>('left');
  readonly label = input<string>('');
  readonly error = input<string>('');
  readonly hint = input<string>('');

  // ============ OUTPUTS ============
  readonly onValueChange = output<string>();
  readonly onBlur = output<void>();
  readonly onFocus = output<void>();

  // ============ STATE ============
  internalValue = signal('');
  isFocused = signal(false);
  isTouched = signal(false);
  internalDisabled = signal(false);

  // ============ CONTROL VALUE ACCESSOR ============
  onChange: any = () => { };
  onTouched: any = () => { };

  // ============ METHODS ============
  onInputChange(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.internalValue.set(value);
    this.onValueChange.emit(value);
    this.onChange(value);
  }

  onBlurEvent(): void {
    this.isFocused.set(false);
    this.isTouched.set(true);
    this.onBlur.emit();
    this.onTouched();
  }

  onFocusEvent(): void {
    this.isFocused.set(true);
  }

  writeValue(value: string): void {
    this.internalValue.set(value ?? '');
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.internalDisabled.set(isDisabled);
  }
}
