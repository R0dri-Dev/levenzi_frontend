import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LvColorVariant, LvSize, LvTextAlign, LvWeight } from '../../../types';


@Component({
  selector: 'lv-paragraph',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paragraph.html',
  styleUrls: ['./paragraph.css'],
})
export class LvParagraphComponent {
  readonly size = input<LvSize>('md');
  readonly weight = input<LvWeight>('normal');
  readonly color = input<LvColorVariant>('neutral');
  readonly align = input<LvTextAlign>('left');
  readonly truncate = input(false);
  readonly muted = input(false);
}
