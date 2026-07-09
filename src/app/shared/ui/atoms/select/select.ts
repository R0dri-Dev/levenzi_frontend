import { Component, effect, forwardRef, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LvSize, LvColorVariant, LvAppearance } from '../../../types';
import { Option } from '../../../interfaces/option.interface';

@Component({
  selector: 'lv-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.html',
  styleUrls: ['./select.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LvSelectComponent),
      multi: true,
    },
  ],
})
export class LvSelectComponent implements ControlValueAccessor {
  readonly options = input<Option[]>([]);
  readonly value = input<string | number>('');
  readonly disabled = input(false);
  readonly variant = input<LvColorVariant>('primary');
  readonly appearance = input<LvAppearance>('outline');
  readonly size = input<LvSize>('md');
  readonly placeholder = input<string>('Selecciona una opción');
  readonly label = input<string>('');
  readonly required = input(false);
  readonly error = input<string>('');

  readonly onValueChange = output<string | number>();

  internalValue = signal<string | number>('');
  onChange: (value: string | number) => void = () => { };
  onTouched: () => void = () => { };

  constructor() {
    effect(() => {
      const externalValue = this.value();
      if (externalValue !== this.internalValue()) {
        this.internalValue.set(externalValue);
      }
    });
  }

  handleChange(raw: string): void {
    if (this.disabled()) return;
    const num = Number(raw);
    const value = Number.isNaN(num) ? raw : num;
    this.internalValue.set(value);
    this.onValueChange.emit(value);
    this.onChange(value);
  }

  writeValue(value: string | number | null | undefined): void {
    this.internalValue.set(value ?? '');
  }

  registerOnChange(fn: (value: string | number) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // handled by disabled input
  }
}
