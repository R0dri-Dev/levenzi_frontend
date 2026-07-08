import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvCardComponent } from '../../atoms/card/card';
import { LvPageFilterComponent } from '../page-filter/page-filter';
import { LvDividerComponent } from '../../atoms/divider/divider';
import { LvSize, LvAppearance } from '../../../types';

@Component({
  selector: 'lv-data-filter',
  standalone: true,
  imports: [CommonModule, LvCardComponent, LvPageFilterComponent, LvDividerComponent],
  templateUrl: './data-filter.html',
  styleUrls: ['./data-filter.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LvDataFilterComponent {
  readonly appearance = input<LvAppearance>('light');
  readonly size = input<LvSize>('md');
  readonly fullWidth = input(true);
}
