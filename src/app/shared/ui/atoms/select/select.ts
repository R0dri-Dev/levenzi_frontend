import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvSize, LvColorVariant, LvAppearance } from '../../../types';
import { Option } from '../../../interfaces/option.interface';

@Component({
  selector: 'lv-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select.html',
  styleUrls: ['./select.css'],
})
export class LvSelectComponent {
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

  handleChange(raw: string): void {
    if (this.disabled()) return;
    const num = Number(raw);
    this.onValueChange.emit(Number.isNaN(num) ? raw : num);
  }
}
