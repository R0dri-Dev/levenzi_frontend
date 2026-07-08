import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvIconComponent } from '../../icons/icon/icon';
import { LvIconButtonComponent } from '../../atoms/icon-button/icon-button';
import { LvSize, LvColorVariant, LvAppearance } from '../../../types';
import type { IconKeys } from '../../../core/icons';

export type FilterChipShape = 'default' | 'rounded' | 'pill';

@Component({
  selector: 'lv-filter-chip',
  standalone: true,
  imports: [CommonModule, LvIconComponent, LvIconButtonComponent],
  templateUrl: './filter-chip.html',
  styleUrls: ['./filter-chip.css'],
})
export class LvFilterChipComponent {
  readonly label = input.required<string>();
  readonly variant = input<LvColorVariant>('primary');
  readonly appearance = input<LvAppearance>('light');
  readonly size = input<LvSize>('md');
  readonly shape = input<FilterChipShape>('default');
  readonly removable = input(false);
  readonly disabled = input(false);
  readonly selected = input(false);
  readonly icon = input<IconKeys>();

  readonly onRemove = output<void>();
  readonly onClick = output<void>();

  handleClick(): void {
    if (this.disabled()) return;
    this.onClick.emit();
  }

  handleRemove(event: Event): void {
    event.stopPropagation();
    if (this.disabled()) return;
    this.onRemove.emit();
  }
}
