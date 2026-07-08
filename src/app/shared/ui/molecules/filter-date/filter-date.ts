import { Component, input, output, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LvButtonComponent } from '../../atoms/button/button';
import { LvInputComponent } from '../../atoms/input/input';
import { LvIconComponent } from '../../icons/icon/icon';
import { LvSize, LvColorVariant } from '../../../types';

export type FilterDatePreset = 'today' | 'week' | 'month' | 'quarter' | 'year';

@Component({
  selector: 'lv-filter-date',
  standalone: true,
  imports: [CommonModule, FormsModule, LvIconComponent, LvButtonComponent, LvInputComponent],
  templateUrl: './filter-date.html',
  styleUrls: ['./filter-date.css'],
})
export class LvFilterDateComponent {
  readonly label = input<string>('Fecha');
  readonly color = input<LvColorVariant>('primary');
  readonly size = input<LvSize>('md');
  readonly disabled = input(false);
  readonly startDate = input<string>('');
  readonly endDate = input<string>('');
  readonly showPresets = input(false);

  readonly onDateChange = output<{ start: string; end: string }>();
  readonly onPresetClick = output<FilterDatePreset>();

  readonly startValue = signal('');
  readonly endValue = signal('');

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
