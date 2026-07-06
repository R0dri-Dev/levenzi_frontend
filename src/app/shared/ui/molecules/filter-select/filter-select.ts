import { Component, computed, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  LV_FILTER_SELECT_BASE,
  LV_FILTER_SELECT_SIZES,
  LV_FILTER_SELECT_SELECT,
  LV_FILTER_SELECT_ICON,
  LV_FILTER_SELECT_LABEL,
  LV_FILTER_SELECT_ARROW,
} from '../../../theme/filter-select.theme';
import type { FilterSelectVariant, FilterSelectSize, FilterSelectOption } from '../../../types/filter-select.types';
import { LvIconComponent } from '../../icons/icon/icon';

@Component({
  selector: 'lv-filter-select',
  standalone: true,
  imports: [CommonModule, FormsModule, LvIconComponent],
  templateUrl: './filter-select.html',
  styleUrl: './filter-select.css',
})
export class LvFilterSelectComponent {
  readonly label = input<string>('');
  readonly options = input.required<FilterSelectOption[]>();
  readonly variant = input<FilterSelectVariant>('primary');
  readonly size = input<FilterSelectSize>('md');
  readonly disabled = input(false);
  readonly placeholder = input<string>('Seleccionar...');
  readonly value = input<string>('');

  readonly onSelect = output<string>();

  readonly selectedValue = signal('');

  readonly classes = computed(() => {
    const base = LV_FILTER_SELECT_BASE;
    const size = LV_FILTER_SELECT_SIZES[this.size()];
    const disabled = this.disabled() ? 'opacity-50 cursor-not-allowed' : '';

    return {
      container: [base, size, disabled].filter(Boolean).join(' '),
      select: LV_FILTER_SELECT_SELECT,
      icon: LV_FILTER_SELECT_ICON,
      label: LV_FILTER_SELECT_LABEL,
      arrow: LV_FILTER_SELECT_ARROW,
    };
  });

  onSelectChange(value: string): void {
    this.selectedValue.set(value);
    this.onSelect.emit(value);
  }
}
