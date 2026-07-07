import { Component, computed, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  LV_FILTER_CHIP_BASE,
  LV_FILTER_CHIP_VARIANTS,
  LV_FILTER_CHIP_SIZES,
  LV_FILTER_CHIP_SHAPES,
  LV_FILTER_CHIP_REMOVE,
} from '../../../theme/filter-chip.theme';
import type { FilterChipVariant, FilterChipSize, FilterChipShape } from '../../../types/filter-chip.types';
import { LvIconComponent } from '../../icons/icon/icon';
import { LvIconButtonComponent } from '../../atoms/icon-button/icon-button';


@Component({
  selector: 'lv-filter-chip',
  standalone: true,
  imports: [CommonModule, LvIconComponent, LvIconButtonComponent],
  templateUrl: './filter-chip.html',
  styleUrl: './filter-chip.css',
})
export class LvFilterChipComponent {
  readonly label = input.required<string>();
  readonly variant = input<FilterChipVariant>('primary');
  readonly size = input<FilterChipSize>('md');
  readonly shape = input<FilterChipShape>('default');
  readonly removable = input(false);
  readonly disabled = input(false);
  readonly selected = input(false);
  readonly icon = input<string>();

  readonly onRemove = output<void>();
  readonly onClick = output<void>();

  readonly classes = computed(() => {
    const base = LV_FILTER_CHIP_BASE;
    const variant = LV_FILTER_CHIP_VARIANTS[this.variant()];
    const size = LV_FILTER_CHIP_SIZES[this.size()];
    const shape = LV_FILTER_CHIP_SHAPES[this.shape()];
    const selected = this.selected() ? 'ring-2 ring-offset-1 ring-blue-500' : '';

    return {
      chip: [base, variant, size, shape, selected].filter(Boolean).join(' '),
      remove: LV_FILTER_CHIP_REMOVE,
    };
  });

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
