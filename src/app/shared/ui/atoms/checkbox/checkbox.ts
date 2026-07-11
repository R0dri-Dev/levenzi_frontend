import { Component, input, output, signal, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { LvSize, LvColorVariant } from '../../../types';

@Component({
  selector: 'lv-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox.html',
  styleUrls: ['./checkbox.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LvCheckboxComponent),
      multi: true,
    },
  ],
})
export class LvCheckboxComponent implements ControlValueAccessor {
  // ============ INPUTS (presentación) ============
  readonly variant = input<LvColorVariant>('primary');
  readonly size = input<LvSize>('md');
  readonly disabled = input(false);
  readonly checked = input(false);

  // ============ OUTPUTS ============
  readonly onChange = output<boolean>();

  // ============ STATE ============
  internalChecked = signal(false);
  internalDisabled = signal(false);

  private cvaOnChange: any = () => { };
  private cvaOnTouched: any = () => { };

  // ============ METHODS ============
  handleChange(event: Event): void {
    if (this.internalDisabled()) return;
    const checked = (event.target as HTMLInputElement).checked;
    this.internalChecked.set(checked);
    this.onChange.emit(checked);
    this.cvaOnChange(checked);
    this.cvaOnTouched();
  }

  writeValue(value: boolean): void {
    this.internalChecked.set(!!value);
  }

  registerOnChange(fn: any): void {
    this.cvaOnChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.cvaOnTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.internalDisabled.set(isDisabled);
  }
}
