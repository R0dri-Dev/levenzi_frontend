import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LvCardComponent } from '../../atoms/card/card';
import { LvPageFilterComponent } from '../page-filter/page-filter';
import type { FilterBarVariant, FilterBarLayout, FilterBarSpacing } from '../../../types/filter-bar.types';

@Component({
  selector: 'lv-filters-panel',
  standalone: true,
  imports: [CommonModule, LvCardComponent, LvPageFilterComponent],
  templateUrl: './filters-panel.html',
  styleUrl: './filters-panel.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LvFiltersPanelComponent {
  readonly variant = input<FilterBarVariant>('table');
  readonly layout = input<FilterBarLayout>('wrap');
  readonly spacing = input<FilterBarSpacing>('md');
  readonly fullWidth = input(true);
}
