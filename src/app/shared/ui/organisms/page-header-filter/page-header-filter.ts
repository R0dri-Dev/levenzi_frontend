import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LvFilterBarComponent } from '../../molecules/filter-bar/filter-bar';
import { LvPageHeaderComponent } from '../page-header/page-header';
import type { BreadcrumbItem } from '../../../types/breadcrumb.types';
import type { PageHeaderAlignment, PageHeaderVariant } from '../../../types/page-header.types';
import type { FilterBarVariant, FilterBarLayout, FilterBarSpacing } from '../../../types/filter-bar.types';
import type { IconKeys } from '../../../core/icons';

@Component({
  selector: 'lv-page-header-filter',
  standalone: true,
  imports: [CommonModule, LvPageHeaderComponent, LvFilterBarComponent],
  templateUrl: './page-header-filter.html',
  styleUrl: './page-header-filter.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LvPageHeaderFilterComponent {
  readonly title = input.required<string>();
  readonly subtitle = input<string>();
  readonly icon = input<IconKeys>();
  readonly breadcrumb = input<BreadcrumbItem[]>([]);
  readonly variant = input<PageHeaderVariant>('default');
  readonly alignment = input<PageHeaderAlignment>('left');

  readonly filterVariant = input<FilterBarVariant>('default');
  readonly filterLayout = input<FilterBarLayout>('wrap');
  readonly filterSpacing = input<FilterBarSpacing>('md');
  readonly filterFullWidth = input(true);
}
