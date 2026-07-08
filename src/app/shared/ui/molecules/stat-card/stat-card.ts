import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvIconComponent } from '../../icons/icon/icon';
import { LvHeadingComponent } from '../../atoms/heading/heading';
import { LvParagraphComponent } from '../../atoms/paragraph/paragraph';
import { LvSize, LvColorVariant } from '../../../types';
import type { IconKeys } from '../../../core/icons';

export type StatCardTrend = 'up' | 'down' | 'stable';

@Component({
  selector: 'lv-stat-card',
  standalone: true,
  imports: [CommonModule, LvIconComponent, LvHeadingComponent, LvParagraphComponent],
  templateUrl: './stat-card.html',
  styleUrls: ['./stat-card.css'],
})
export class LvStatCardComponent {
  readonly title = input.required<string>();
  readonly value = input.required<string | number>();
  readonly color = input<LvColorVariant>('primary');
  readonly size = input<LvSize>('md');
  readonly icon = input<IconKeys>();
  readonly trend = input<StatCardTrend>();
  readonly trendValue = input<string>();
  readonly description = input<string>();
}
