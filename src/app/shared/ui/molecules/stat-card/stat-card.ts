import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';


import {
  LV_STAT_CARD_BASE,
  LV_STAT_CARD_SIZES,
  LV_STAT_CARD_VARIANTS,
  LV_STAT_CARD_ICON,
  LV_STAT_CARD_ICON_VARIANTS,
  LV_STAT_CARD_TITLE,
  LV_STAT_CARD_VALUE,
  LV_STAT_CARD_TREND,
  LV_STAT_CARD_TREND_UP,
  LV_STAT_CARD_TREND_DOWN,
  LV_STAT_CARD_TREND_STABLE,
  LV_STAT_CARD_DESCRIPTION,
} from '../../../theme/stat-card.theme';
import type { StatCardVariant, StatCardSize, StatCardTrend } from '../../../types/stat-card.types';
import { LvIconComponent } from '../../icons/icon/icon';

@Component({
  selector: 'lv-stat-card',
  standalone: true,
  imports: [CommonModule, LvIconComponent],
  templateUrl: './stat-card.html',
  styleUrl: './stat-card.css',
})
export class LvStatCardComponent {
  readonly title = input.required<string>();
  readonly value = input.required<string | number>();
  readonly variant = input<StatCardVariant>('primary');
  readonly size = input<StatCardSize>('md');
  readonly icon = input<string>();
  readonly trend = input<StatCardTrend>();
  readonly trendValue = input<string>();
  readonly description = input<string>();

  readonly classes = computed(() => {
    const base = LV_STAT_CARD_BASE;
    const size = LV_STAT_CARD_SIZES[this.size()];
    const variant = LV_STAT_CARD_VARIANTS[this.variant()];

    return {
      card: [base, size, variant].filter(Boolean).join(' '),
      icon: [LV_STAT_CARD_ICON, LV_STAT_CARD_ICON_VARIANTS[this.variant()]].filter(Boolean).join(' '),
      title: LV_STAT_CARD_TITLE,
      value: LV_STAT_CARD_VALUE,
      description: LV_STAT_CARD_DESCRIPTION,
    };
  });

  getTrendClass(): string {
    const trend = this.trend();
    if (!trend) return '';

    const trendMap = {
      up: LV_STAT_CARD_TREND_UP,
      down: LV_STAT_CARD_TREND_DOWN,
      stable: LV_STAT_CARD_TREND_STABLE,
    };

    return [LV_STAT_CARD_TREND, trendMap[trend]].filter(Boolean).join(' ');
  }

  getTrendIcon(): string {
    const trend = this.trend();
    if (!trend) return '';

    const iconMap = {
      up: 'arrow-up',
      down: 'arrow-down',
      stable: 'minus',
    };

    return iconMap[trend];
  }
}
