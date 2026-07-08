import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvSize, LvAppearance } from '../../../types';
import { LvFilterBarComponent } from "../../molecules";

@Component({
  selector: 'lv-page-filter',
  standalone: true,
  imports: [CommonModule, LvFilterBarComponent],
  templateUrl: './page-filter.html',
  styleUrls: ['./page-filter.css'],
})
export class LvPageFilterComponent {
  readonly appearance = input<LvAppearance>('light');
  readonly size = input<LvSize>('md');
  readonly fullWidth = input(false);
}
