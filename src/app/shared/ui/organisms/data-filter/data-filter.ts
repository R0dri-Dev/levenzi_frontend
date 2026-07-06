import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LvCardComponent } from '../../atoms/card/card';
import { LvPageFilterComponent } from '../page-filter/page-filter';
import type { FilterBarVariant, FilterBarLayout, FilterBarSpacing } from '../../../types/filter-bar.types';

@Component({
  selector: 'lv-data-filter',
  standalone: true,
  imports: [CommonModule, LvCardComponent, LvPageFilterComponent],
  templateUrl: './data-filter.html',
  styleUrl: './data-filter.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LvDataFilterComponent {
  readonly variant = input<FilterBarVariant>('table');
  readonly layout = input<FilterBarLayout>('horizontal');
  readonly spacing = input<FilterBarSpacing>('md');
  readonly fullWidth = input(true);
}
