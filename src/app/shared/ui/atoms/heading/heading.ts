import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvColorVariant, LvAlign, LvTextAlign } from '../../../types';
import { LvLevel } from '../../../types/level.types';


@Component({
  selector: 'lv-heading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './heading.html',
  styleUrls: ['./heading.css'],
})
export class LvHeadingComponent {
  readonly level = input<LvLevel>('1');
  readonly text = input<string>('');
  readonly align = input<LvAlign>('start');
  readonly textAlign = input<LvTextAlign>('left');
  readonly color = input<LvColorVariant>('neutral');
  readonly subtitle = input('');
  readonly weight = input<'light' | 'normal' | 'medium' | 'semibold' | 'bold'>('bold');
}
