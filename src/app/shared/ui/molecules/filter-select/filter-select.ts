import { Component, input, output, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LvIconComponent } from '../../icons/icon/icon';
import { LvSize, LvColorVariant } from '../../../types';

export interface FilterSelectOption {
  label: string;
  value: string;
}

@Component({
  selector: 'lv-filter-select',
  standalone: true,
  imports: [CommonModule, FormsModule, LvIconComponent],
  templateUrl: './filter-select.html',
  styleUrls: ['./filter-select.css'],
})
export class LvFilterSelectComponent {
  readonly label = input<string>('');
  readonly options = input.required<FilterSelectOption[]>();
  readonly color = input<LvColorVariant>('primary');
  readonly size = input<LvSize>('md');
  readonly disabled = input(false);
  readonly placeholder = input<string>('Seleccionar...');
  readonly value = input<string>('');

  readonly onSelect = output<string>();

  readonly selectedValue = signal('');

  constructor() {
    effect(() => {
      const externalValue = this.value();
      if (externalValue !== this.selectedValue()) {
        this.selectedValue.set(externalValue);
      }
    });
  }

  onSelectChange(value: string): void {
    this.selectedValue.set(value);
    this.onSelect.emit(value);
  }
}
