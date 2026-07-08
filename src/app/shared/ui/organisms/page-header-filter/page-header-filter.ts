import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvFilterBarComponent } from '../../molecules/filter-bar/filter-bar';
import { LvPageHeaderComponent } from '../page-header/page-header';
import type { BreadcrumbItem } from '../../../interfaces/breadcrumb.interface';
import type { IconKeys } from '../../../core/icons';
import { LvColorVariant, LvTextAlign, LvSize, LvAppearance } from '../../../types';

@Component({
  selector: 'lv-page-header-filter',
  standalone: true,
  imports: [CommonModule, LvPageHeaderComponent, LvFilterBarComponent],
  templateUrl: './page-header-filter.html',
  styleUrls: ['./page-header-filter.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LvPageHeaderFilterComponent {
  readonly title = input.required<string>();
  readonly subtitle = input<string>();
  readonly icon = input<IconKeys>();
  readonly breadcrumb = input<BreadcrumbItem[]>([]);
  readonly color = input<LvColorVariant>('primary');
  readonly align = input<LvTextAlign>('left');

  readonly filterAppearance = input<LvAppearance>('light');
  readonly filterSize = input<LvSize>('md');
  readonly filterFullWidth = input(true);
}
