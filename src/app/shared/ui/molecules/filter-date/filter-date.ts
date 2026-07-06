import { Component, computed, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LvButtonComponent } from '../../atoms/button/button';

import {
  LV_FILTER_DATE_BASE,
  LV_FILTER_DATE_SIZES,
  LV_FILTER_DATE_INPUT,
  LV_FILTER_DATE_ICON,
  LV_FILTER_DATE_LABEL,
} from '../../../theme/filter-date.theme';
import type { FilterDateVariant, FilterDateSize, FilterDatePreset } from '../../../types/filter-date.types';
import { LvIconComponent } from '../../icons/icon/icon';

@Component({
  selector: 'lv-filter-date',
  standalone: true,
  imports: [CommonModule, FormsModule, LvIconComponent, LvButtonComponent],
  templateUrl: './filter-date.html',
  styleUrl: './filter-date.css',
})
export class LvFilterDateComponent {
  readonly label = input<string>('Fecha');
  readonly variant = input<FilterDateVariant>('primary');
  readonly size = input<FilterDateSize>('md');
  readonly disabled = input(false);
  readonly startDate = input<string>('');
  readonly endDate = input<string>('');
  readonly showPresets = input(false);

  readonly onDateChange = output<{ start: string; end: string }>();
  readonly onPresetClick = output<FilterDatePreset>();

  readonly startValue = signal('');
  readonly endValue = signal('');

  readonly classes = computed(() => {
    const base = LV_FILTER_DATE_BASE;
    const size = LV_FILTER_DATE_SIZES[this.size()];
    const disabled = this.disabled() ? 'opacity-50 cursor-not-allowed' : '';

    return {
      container: [base, size, disabled].filter(Boolean).join(' '),
      input: LV_FILTER_DATE_INPUT,
      icon: LV_FILTER_DATE_ICON,
      label: LV_FILTER_DATE_LABEL,
    };
  });

  onStartChange(value: string): void {
    this.startValue.set(value);
    this.emitChange();
  }

  onEndChange(value: string): void {
    this.endValue.set(value);
    this.emitChange();
  }

  private emitChange(): void {
    this.onDateChange.emit({
      start: this.startValue(),
      end: this.endValue(),
    });
  }

  applyPreset(preset: FilterDatePreset): void {
    if (this.disabled()) return;
    this.onPresetClick.emit(preset);
  }
}
