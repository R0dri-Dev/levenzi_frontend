import { Component, computed, input } from '@angular/core';
import { ParagraphSize, ParagraphWeight } from '../../../types/paragraph.types';
import { LV_PARAGRAPH_BASE, LV_PARAGRAPH_SIZES, LV_PARAGRAPH_WEIGHTS } from '../../../theme/paragraph.theme';


@Component({
  selector: 'lv-paragraph',
  standalone: true,
  templateUrl: './paragraph.html',
})
export class LvParagraphComponent {

  readonly size = input<ParagraphSize>('md');

  readonly weight = input<ParagraphWeight>('normal');

  readonly truncate = input(false);

  readonly classes = computed(() =>
    [
      LV_PARAGRAPH_BASE,
      LV_PARAGRAPH_SIZES[this.size()],
      LV_PARAGRAPH_WEIGHTS[this.weight()],
      this.truncate() ? 'truncate' : '',
    ].join(' ')
  );

}
