import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvSize, LvColorVariant } from '../../../types';

@Component({
  selector: 'lv-radio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './radio.html',
  styleUrls: ['./radio.css'],
})
export class LvRadioComponent {
  readonly name = input.required<string>();
  readonly value = input.required<string>();
  readonly checked = input(false);
  readonly disabled = input(false);
  readonly size = input<LvSize>('md');
  readonly color = input<LvColorVariant>('primary');
  readonly label = input<string>('');

  readonly changed = output<string>();

  handleChange(): void {
    if (this.disabled()) return;
    this.changed.emit(this.value());
  }
}
