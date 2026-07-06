import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LvFilterBarComponent } from '../../molecules/filter-bar/filter-bar';
import type { FilterBarVariant, FilterBarLayout, FilterBarSpacing } from '../../../types/filter-bar.types';

@Component({
  selector: 'lv-page-filter',
  standalone: true,
  imports: [CommonModule, LvFilterBarComponent],
  templateUrl: './page-filter.html',
  styleUrl: './page-filter.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LvPageFilterComponent {
  readonly variant = input<FilterBarVariant>('default');
  readonly layout = input<FilterBarLayout>('wrap');
  readonly spacing = input<FilterBarSpacing>('md');
  readonly fullWidth = input(true);

  readonly classes = computed(() => ({
    container: 'w-full',
  }));
}
