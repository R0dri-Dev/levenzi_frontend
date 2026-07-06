import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LvStatCardComponent } from '../../molecules/stat-card/stat-card';

import type { StatItem } from '../../../types/stats-panel.types';

@Component({
  selector: 'lv-stats-panel',
  standalone: true,
  imports: [CommonModule, LvStatCardComponent],
  templateUrl: './stats-panel.html',
  styleUrl: './stats-panel.css',
})
export class LvStatsPanelComponent {
  readonly stats = input.required<StatItem[]>();
  readonly columns = input<2 | 3 | 4 | 6>(4);

  readonly gridClass = computed(() => {
    const map: Record<number, string> = {
      2: 'grid-cols-1 sm:grid-cols-2',
      3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
      4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
      6: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6',
    };
    return map[this.columns()] || map[4];
  });
}
