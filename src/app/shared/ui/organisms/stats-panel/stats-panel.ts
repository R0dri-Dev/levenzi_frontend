import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvStatCardComponent } from '../../molecules/stat-card/stat-card';
import type { StatItem } from '../../../interfaces/stats-panel.interface';

@Component({
  selector: 'lv-stats-panel',
  standalone: true,
  imports: [CommonModule, LvStatCardComponent],
  templateUrl: './stats-panel.html',
  styleUrls: ['./stats-panel.css'],
})
export class LvStatsPanelComponent {
  readonly stats = input.required<StatItem[]>();
  readonly columns = input<2 | 3 | 4 | 6>(4);
}
