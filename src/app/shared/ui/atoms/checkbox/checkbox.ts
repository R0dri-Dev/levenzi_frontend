import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvSize, LvColorVariant } from '../../../types';

@Component({
  selector: 'lv-checkbox',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './checkbox.html',
  styleUrls: ['./checkbox.css'],
})
export class LvCheckboxComponent {
  readonly variant = input<LvColorVariant>('primary');
  readonly size = input<LvSize>('md');
  readonly disabled = input(false);
  readonly checked = input(false);

  readonly onChange = output<boolean>();

  handleChange(event: Event): void {
    if (this.disabled()) return;
    const target = event.target as HTMLInputElement;
    this.onChange.emit(target.checked);
  }
}
