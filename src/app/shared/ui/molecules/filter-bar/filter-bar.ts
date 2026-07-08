import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvSize, LvAppearance } from '../../../types';

@Component({
  selector: 'lv-filter-bar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './filter-bar.html',
  styleUrls: ['./filter-bar.css'],
})
export class LvFilterBarComponent {
  readonly appearance = input<LvAppearance>('solid');
  readonly size = input<LvSize>('md');
  readonly fullWidth = input(false);
}
