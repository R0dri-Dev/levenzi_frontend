import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvSize, LvColorVariant } from '../../../types';

@Component({
  selector: 'lv-spinner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spinner.html',
  styleUrls: ['./spinner.css'],
})
export class LvSpinnerComponent {
  readonly size = input<LvSize>('md');
  readonly color = input<LvColorVariant>('primary');
}
