// shared/ui/atoms/paragraph/paragraph.ts
import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ParagraphSize,
  ParagraphWeight,
  ParagraphAlign,
} from '../../../types/paragraph.types';
import {
  LV_PARAGRAPH_BASE,
  LV_PARAGRAPH_SIZES,
  LV_PARAGRAPH_WEIGHTS,
  LV_PARAGRAPH_ALIGN,
} from '../../../theme/paragraph.theme';
import { LV_COLORS } from '../../../theme/colors';

@Component({
  selector: 'lv-paragraph',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './paragraph.html',
})
export class LvParagraphComponent {
  readonly size = input<ParagraphSize>('md');
  readonly weight = input<ParagraphWeight>('normal');
  readonly color = input<string>('gray');
  readonly align = input<ParagraphAlign>('left');
  readonly truncate = input(false);

  readonly classes = computed(() => {
    const base = LV_PARAGRAPH_BASE;
    const size = LV_PARAGRAPH_SIZES[this.size()] || '';
    const weight = LV_PARAGRAPH_WEIGHTS[this.weight()] || '';
    const align = LV_PARAGRAPH_ALIGN[this.align()] || '';

    const colorMap: Record<string, string> = {
      gray: LV_COLORS.gray.text,
      white: 'text-white',
      blue: LV_COLORS.primary.text,
      red: LV_COLORS.danger.text,
      green: LV_COLORS.success.text,
      yellow: LV_COLORS.warning.text,
      inherit: 'text-inherit',
    };
    const color = colorMap[this.color()] || colorMap['gray'];

    const truncate = this.truncate() ? 'truncate' : '';

    return [base, size, weight, color, align, truncate].filter(Boolean).join(' ');
  });
}
