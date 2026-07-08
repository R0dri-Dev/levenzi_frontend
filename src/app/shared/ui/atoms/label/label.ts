import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvSize, LvColorVariant } from '../../../types';

@Component({
  selector: 'lv-label',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './label.html',
  styleUrls: ['./label.css'],
})
export class LvLabelComponent {
  readonly text = input<string>('');
  readonly for = input<string>('');
  readonly required = input(false);
  readonly color = input<LvColorVariant>('primary');
  readonly size = input<LvSize>('md');
  readonly disabled = input(false);
}
