// shared/ui/atoms/heading/heading.ts
import { Component, computed, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeadingLevel, HeadingAlign } from '../../../types/heading.types';
import { LV_HEADING_LEVELS } from '../../../theme/heading.theme';
import { LV_COLORS } from '../../../theme/colors';

@Component({
  selector: 'lv-heading',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './heading.html'
})
export class LvHeadingComponent {
  readonly level = input<HeadingLevel>('1');
  readonly text = input<string>('');
  readonly align = input<HeadingAlign>('left');
  readonly subtitle = input('');
  readonly color = input<string>('gray');

  readonly classes = computed(() => {
    const base = LV_HEADING_LEVELS[this.level()] || '';
    const alignMap: Record<HeadingAlign, string> = {
      left: 'text-left',
      center: 'text-center',
      right: 'text-right',
    };
    const align = alignMap[this.align()] || '';

    const colorMap: Record<string, string> = {
      gray: LV_COLORS.gray.text,
      white: 'text-white',
      blue: LV_COLORS.primary.text,
      red: LV_COLORS.danger.text,
      green: LV_COLORS.success.text,
      yellow: LV_COLORS.warning.text,
    };
    const color = colorMap[this.color()] || colorMap['gray'];

    return [base, align, color].filter(Boolean).join(' ');
  });
}
