import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvSize, LvColorVariant } from '../../../types';

@Component({
  selector: 'lv-chip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chip.html',
  styleUrls: ['./chip.css'],
})
export class LvChipComponent {
  readonly label = input.required<string>();
  readonly size = input<LvSize>('md');
  readonly variant = input<LvColorVariant>('primary');
  readonly removable = input(false);
  readonly disabled = input(false);

  readonly clicked = output<void>();
  readonly removed = output<void>();

  handleClick(event: Event): void {
    if (this.disabled()) return;
    this.clicked.emit();
  }

  handleRemove(event: Event): void {
    event.stopPropagation();
    if (this.disabled()) return;
    this.removed.emit();
  }
}
