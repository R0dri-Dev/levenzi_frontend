import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvSize, LvColorVariant } from '../../../types';

@Component({
  selector: 'lv-switch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './switch.html',
  styleUrls: ['./switch.css'],
})
export class LvSwitchComponent {
  readonly checked = input(false);
  readonly disabled = input(false);
  readonly size = input<LvSize>('md');
  readonly color = input<LvColorVariant>('primary');
  readonly label = input<string>('');

  readonly changed = output<boolean>();

  toggle(): void {
    if (this.disabled()) return;
    this.changed.emit(!this.checked());
  }
}
