import { Component, effect, forwardRef, input, output, signal, untracked } from '@angular/core';
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
  onChange: (value: any) => void = () => { };
  onTouched: () => void = () => { };

  private markAsNullIfPlaceholder(raw: string): string | number | null {
    if (raw === '') return '';
    const num = Number(raw);
    return Number.isNaN(num) ? raw : num;
  }

 constructor() {
  effect(() => {
    const externalValue = this.value();
    untracked(() => {
      if (externalValue !== this.internalValue()) {
        this.internalValue.set(externalValue);
      }
    });
  });

  effect(() => {
    this.options();
    untracked(() => {
      this.internalValue.set(this.internalValue());
    });
  });
}

  handleChange(raw: string): void {
    console.log('[LvSelect] handleChange DISPARADO. raw =', raw);
    if (this.disabled()) return;

    if (raw === '') {
      const v = '';
      this.internalValue.set(v);
      this.onValueChange.emit(v);
      this.onChange(v);
      return;
    }

    const normalized = this.markAsNullIfPlaceholder(raw);
    const normalizedForSelect = normalized ?? '';
    this.internalValue.set(normalizedForSelect);
    this.onValueChange.emit(normalizedForSelect);
    this.onChange(normalizedForSelect);
  }

  writeValue(value: string | number | null | undefined): void {
    this.internalValue.set((value ?? '').toString());
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // handled by disabled input
  }
}
