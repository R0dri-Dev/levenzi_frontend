import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LvFilterChipComponent } from '../filter-chip/filter-chip';
import { LvFilterDateComponent } from '../filter-date/filter-date';
import { LvFilterSelectComponent } from '../filter-select/filter-select';

import {
  LV_FILTER_BAR_BASE,
  LV_FILTER_BAR_LAYOUTS,
  LV_FILTER_BAR_VARIANTS,
  LV_FILTER_BAR_SPACING,
} from '../../../theme/filter-bar.theme';
import type { FilterBarVariant, FilterBarLayout, FilterBarSpacing } from '../../../types/filter-bar.types';

@Component({
  selector: 'lv-filter-bar',
  standalone: true,
  imports: [CommonModule, LvFilterChipComponent, LvFilterDateComponent, LvFilterSelectComponent],
  templateUrl: './filter-bar.html',
  styleUrl: './filter-bar.css',
})
export class LvFilterBarComponent {
  readonly variant = input<FilterBarVariant>('default');
  readonly layout = input<FilterBarLayout>('wrap');
  readonly spacing = input<FilterBarSpacing>('md');
  readonly fullWidth = input(false);

  readonly classes = computed(() => {
    const base = LV_FILTER_BAR_BASE;
    const layout = LV_FILTER_BAR_LAYOUTS[this.layout()];
    const variant = LV_FILTER_BAR_VARIANTS[this.variant()];
    const spacing = LV_FILTER_BAR_SPACING[this.spacing()];
    const fullWidth = this.fullWidth() ? 'w-full' : '';

    return [base, layout, variant, spacing, fullWidth].filter(Boolean).join(' ');
  });
}
